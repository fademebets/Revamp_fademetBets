"use client"

import type React from "react"
import { useEffect, useState, useRef, useCallback } from "react"
import axios, { AxiosError } from "axios"
import { io, type Socket } from "socket.io-client"
import { getCookie } from "cookies-next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Send, Users, MessageCircle, AlertCircle } from "lucide-react"

const SERVER_URL = "http://localhost:5000"

interface ChatRoom {
  userId: string
  email?: string
  lastMessage: string
  lastUpdated: string
}

interface Message {
  senderId: string
  senderType: "user" | "admin"
  receiverId: string
  message: string
  createdAt: string
}

interface MessagePayload {
  senderId: string
  senderType: "user" | "admin"
  receiverId: string
  message: string
}

interface SocketAuthData {
  token: string
}

interface ServerToClientEvents {
  connect: () => void
  receive_message: (msg: Message) => void
  disconnect: () => void
}

interface ClientToServerEvents {
  join: (data: { userId: string }) => void
  send_message: (payload: MessagePayload) => void
}

export default function AdminChatPage() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [messageInput, setMessageInput] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [socketConnected, setSocketConnected] = useState<boolean>(false)
  const [sendingMessage, setSendingMessage] = useState<boolean>(false)

  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const getAdminId = useCallback((): string | null => {
    const userId = getCookie("user-id")
    return typeof userId === "string" ? userId : null
  }, [])

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Fetch chat rooms
  useEffect(() => {
    const fetchChatRooms = async (): Promise<void> => {
      try {
        setLoading(true)
        setError(null)
        const token = getCookie("auth-token")

        if (!token) {
          setError("No authentication token found")
          return
        }

        const res = await axios.get<{ chatRooms: ChatRoom[] }>(`${SERVER_URL}/api/chat/admin/chatrooms`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        setChatRooms(res.data.chatRooms)
      } catch (err) {
        console.error("Failed to fetch chat rooms", err)
        const errorMessage =
          err instanceof AxiosError ? err.response?.data?.message || err.message : "Failed to fetch chat rooms"
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchChatRooms()
  }, [])

  // Setup socket connection
  useEffect(() => {
    const token = getCookie("auth-token")
    if (!token) {
      setError("No authentication token found")
      return
    }

    // Clean up existing connection
    if (socketRef.current) {
      socketRef.current.disconnect()
    }

    socketRef.current = io(SERVER_URL, {
      auth: { token } as SocketAuthData,
      transports: ["websocket", "polling"],
    })

    socketRef.current.on("connect", () => {
      console.log("Socket connected:", socketRef.current?.id)
      setSocketConnected(true)
      setError(null)
    })

    socketRef.current.on("disconnect", () => {
      console.log("Socket disconnected")
      setSocketConnected(false)
    })

    socketRef.current.on("connect_error", (err) => {
      console.error("Socket connection error:", err)
      setError("Failed to connect to chat server")
      setSocketConnected(false)
    })

    // Listen for new messages - this handles ALL messages including admin's own
    socketRef.current.on("receive_message", (msg: Message) => {
      console.log("Received message:", msg)

      // Only add message if it belongs to the currently selected conversation
      if (
        (msg.senderType === "user" && msg.senderId === selectedUserId) ||
        (msg.senderType === "admin" && msg.receiverId === selectedUserId)
      ) {
        setMessages((prev) => {
          // Check if message already exists to prevent duplicates
          const messageExists = prev.some(
            (existingMsg) =>
              existingMsg.senderId === msg.senderId &&
              existingMsg.message === msg.message &&
              Math.abs(new Date(existingMsg.createdAt).getTime() - new Date(msg.createdAt).getTime()) < 1000,
          )

          if (messageExists) {
            return prev
          }

          return [...prev, msg]
        })
      }
    })

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [selectedUserId])

  // Fetch messages when user changes
  useEffect(() => {
    if (!selectedUserId) return

    const fetchMessages = async (): Promise<void> => {
      try {
        setLoading(true)
        const token = getCookie("auth-token")

        if (!token) {
          setError("No authentication token found")
          return
        }

        const res = await axios.get<Message[]>(`${SERVER_URL}/api/chat/messages/${selectedUserId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        setMessages(res.data)

        // Join the socket room for this user
        if (socketRef.current && socketConnected) {
          socketRef.current.emit("join", { userId: selectedUserId })
        }
      } catch (err) {
        console.error("Failed to fetch messages", err)
        const errorMessage =
          err instanceof AxiosError ? err.response?.data?.message || err.message : "Failed to fetch messages"
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [selectedUserId, socketConnected])

  // Send message handler - FIXED: Don't add to local state immediately
  const handleSendMessage = useCallback(async (): Promise<void> => {
    if (!messageInput.trim() || !selectedUserId || !socketRef.current || !socketConnected) {
      return
    }

    const adminId = getAdminId()
    if (!adminId) {
      console.error("Admin ID not found in cookies.")
      setError("Admin ID not found. Please log in again.")
      return
    }

    setSendingMessage(true)

    try {
      const messagePayload: MessagePayload = {
        senderId: adminId,
        senderType: "admin",
        receiverId: selectedUserId,
        message: messageInput.trim(),
      }

      // Send message via socket - let the receive_message event handle adding to state
      socketRef.current.emit("send_message", messagePayload)

      // Clear input immediately for better UX
      setMessageInput("")
    } catch (err) {
      console.error("Failed to send message:", err)
      setError("Failed to send message")
    } finally {
      setSendingMessage(false)
    }
  }, [messageInput, selectedUserId, socketConnected, getAdminId])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSendMessage()
      }
    },
    [handleSendMessage],
  )

  const handleUserSelect = useCallback((userId: string): void => {
    setSelectedUserId(userId)
    setMessages([]) // Clear messages when switching users
    setError(null)
  }, [])

  if (error && !chatRooms.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} className="w-full">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Chat Rooms */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Users className="h-5 w-5" />
            Chat Rooms
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <div className={`w-2 h-2 rounded-full ${socketConnected ? "bg-green-500" : "bg-red-500"}`} />
            <span className="text-sm text-gray-600">{socketConnected ? "Connected" : "Disconnected"}</span>
          </div>
        </div>

        <ScrollArea className="flex-1">
          {loading && <div className="p-4 text-center text-gray-500">Loading chat rooms...</div>}

          {chatRooms.length === 0 && !loading && (
            <div className="p-4 text-center text-gray-500">No chat rooms available</div>
          )}

          {chatRooms.map((room) => (
            <div
              key={room.userId}
              onClick={() => handleUserSelect(room.userId)}
              className={`p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                selectedUserId === room.userId ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-gray-900">{room.email || `User ${room.userId}`}</span>
                {selectedUserId === room.userId && (
                  <Badge variant="secondary" className="text-xs">
                    Active
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 truncate mb-1">{room.lastMessage || "No messages yet"}</p>
              <p className="text-xs text-gray-400">{new Date(room.lastUpdated).toLocaleString()}</p>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-gray-600" />
           {selectedUserId ? (
            <h2 className="text-lg font-semibold">
              Chat with{" "}
              {
                chatRooms.find((room) => room.userId === selectedUserId)?.email ??
                `User ${selectedUserId}`
              }
            </h2>
          ) : (
            <h2 className="text-lg font-semibold">Select a user to start chatting</h2>
          )}

          </div>
          {error && <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4 bg-gray-100">
          {loading && selectedUserId && <div className="text-center py-8 text-gray-500">Loading messages...</div>}

          {messages.length === 0 && !loading && selectedUserId && (
            <div className="text-center py-8 text-gray-500">No messages yet. Start the conversation!</div>
          )}

          <div className="space-y-4">
            {messages.map((msg, idx) => {
              const isAdmin = msg.senderType === "admin"
              return (
                <div
                  key={`${msg.senderId}-${msg.createdAt}-${idx}`}
                  className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      isAdmin ? "bg-blue-500 text-white" : "bg-white border border-gray-200 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${isAdmin ? "text-blue-100" : "text-gray-500"}`}>
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>

        {/* Message Input */}
        {selectedUserId ? (
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={!socketConnected || sendingMessage}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!messageInput.trim() || !socketConnected || sendingMessage}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {!socketConnected && (
              <p className="text-sm text-red-600 mt-2">Disconnected from server. Trying to reconnect...</p>
            )}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500 bg-white border-t border-gray-200">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Select a user from the sidebar to start chatting</p>
          </div>
        )}
      </div>
    </div>
  )
}
