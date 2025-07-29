"use client"
import type React from "react"
import { useEffect, useState, useRef, useCallback } from "react"
import axios, { AxiosError } from "axios"
import { io, type Socket } from "socket.io-client"
import { getCookie } from "cookies-next"
import type { Message, MessagePayload, SocketAuthData } from "@/types/chat"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const SERVER_URL = "https://revamp-fademetbets-backend.onrender.com" // Change as needed

interface ServerToClientEvents {
  connect: () => void
  receive_message: (msg: Message) => void
  disconnect: () => void
}

interface ClientToServerEvents {
  join: (data: { userId: string }) => void
  send_message: (payload: MessagePayload) => void
}

export default function UserChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [messageInput, setMessageInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [sendingMessage, setSendingMessage] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [hasSubscription, setHasSubscription] = useState<boolean | null>(null) // New state for subscription check

  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const checkSubscription = async () => {
      const email = getCookie("user-email")
      if (!email || typeof email !== "string") {
        toast.error("User email not found. Please log in.")
        setHasSubscription(false) // Indicate no subscription or login issue
        router.push("/userProfile")
        return
      }
      try {
        const response = await axios.post(`${SERVER_URL}/api/subscription/check-yearly`, {
          email,
        })
        const { isYearlySubscriber } = response.data
        if (!isYearlySubscriber) {
          toast.error("Please purchase a yearly subscription to access this feature.")
          setHasSubscription(false) // Indicate no subscription
          // Redirect immediately
          router.push("/userProfile")
        } else {
          setHasSubscription(true) // User has subscription
        }
      } catch (err) {
        console.error("Subscription check failed", err)
        toast.error("Unable to verify subscription. Please try again later.")
        setHasSubscription(false) // Indicate check failed
        router.push("/userProfile") // Redirect on error
      }
    }
    checkSubscription()
  }, [router])

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const getUserId = useCallback((): string | null => {
    if (typeof window === "undefined") return null
    const id = getCookie("user-id")
    return typeof id === "string" ? id : null
  }, [])

  useEffect(() => {
    const id = getUserId()
    setUserId(id)
    if (!id) setError("User ID not found. Please log in.")
  }, [getUserId])

  useEffect(() => {
    if (!userId || typeof window === "undefined" || hasSubscription !== true) return // Only connect if subscription is true

    const token = getCookie("auth-token")
    if (!token) {
      setError("No authentication token found.")
      return
    }

    if (socketRef.current) {
      socketRef.current.disconnect()
    }

    socketRef.current = io(SERVER_URL, {
      auth: { token } as SocketAuthData,
      transports: ["websocket", "polling"],
    })

    socketRef.current.on("connect", () => {
      console.log("Connected:", socketRef.current?.id)
      setIsConnected(true)
      setError(null) // Clear error on successful connection
      socketRef.current?.emit("join", { userId })
    })

    socketRef.current.on("connect_error", (err) => {
      console.error("Connection error:", err)
      setError("Failed to connect to chat server")
      setIsConnected(false)
    })

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected")
      setIsConnected(false)
    })

    socketRef.current.on("receive_message", (msg: Message) => {
      if (
        (msg.senderType === "admin" && msg.receiverId === userId) ||
        (msg.senderType === "user" && msg.senderId === userId)
      ) {
        setMessages((prev) => {
          const exists = prev.some(
            (m) =>
              m.senderId === msg.senderId &&
              m.message === msg.message &&
              Math.abs(new Date(m.createdAt).getTime() - new Date(msg.createdAt).getTime()) < 1000,
          )
          return exists ? prev : [...prev, msg]
        })
      }
    })

    return () => {
      socketRef.current?.disconnect()
    }
  }, [userId, hasSubscription]) // Re-run effect if userId or hasSubscription changes [^1][^2]

  useEffect(() => {
    const fetchMessages = async () => {
      if (!userId || typeof window === "undefined" || hasSubscription !== true) return // Only fetch if subscription is true
      try {
        setLoading(true)
        const token = getCookie("auth-token")
        if (!token) {
          setError("No authentication token found.")
          return
        }
        const res = await axios.get<Message[]>(`${SERVER_URL}/api/chat/messages/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setMessages(res.data)
      } catch (err) {
        console.error("Fetch error:", err)
        const msg = err instanceof AxiosError ? err.response?.data?.message || err.message : "Fetch failed"
        setError(msg)
      } finally {
        setLoading(false)
      }
    }
    fetchMessages()
  }, [userId, hasSubscription])

  const handleSendMessage = useCallback(async () => {
    if (!messageInput.trim() || !socketRef.current || !isConnected || !userId) return
    setSendingMessage(true)
    try {
      const payload: MessagePayload = {
        senderId: userId,
        senderType: "user",
        receiverId: "68611cc556f0f8ddfc3aba51", // admin ID
        message: messageInput.trim(),
      }
      // Emit to server
      socketRef.current.emit("send_message", payload)
      // Optimistically add message to UI
      const optimisticMessage: Message = {
        ...payload,
        createdAt: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, optimisticMessage])
      setMessageInput("")
    } catch (err) {
      console.error("Send error:", err)
      setError("Failed to send message")
    } finally {
      setSendingMessage(false)
    }
  }, [messageInput, isConnected, userId])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Render nothing or a loading state if subscription is not confirmed
  if (hasSubscription === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg font-semibold text-gray-700">Checking subscription...</div>
      </div>
    )
  }

  // If hasSubscription is false, the redirect should have already happened.
  // This fallback ensures nothing is rendered if for some reason redirect didn't occur.
  if (hasSubscription === false) {
    return null
  }

  // Render the chat page content only if hasSubscription is true
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">U</div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Support Chat</h1>
            <p className="text-sm text-gray-500">Chat with our admin team</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>
          <span className="text-sm text-gray-500">{isConnected ? "Connected" : "Disconnected"}</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading && (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-3/4 h-6 rounded-lg bg-gray-200 animate-pulse ${i % 2 === 0 ? "ml-auto" : "mr-auto"}`}
              ></div>
            ))}
          </div>
        )}
        {messages.length === 0 && !loading && <div className="text-center py-12 text-gray-500">No messages yet</div>}
        {messages.map((msg, idx) => {
          const isUser = msg.senderType === "user"
          return (
            <div key={idx} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
                  isUser
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-900 border border-gray-200 rounded-bl-none"
                }`}
              >
                <div className="break-words">{msg.message}</div>
                <div className={`text-xs mt-1 ${isUser ? "text-blue-100" : "text-gray-500"}`}>
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-3 text-sm"
            role="alert"
          >
            <span className="block">{error}</span>
          </div>
        )}
        <div className="flex space-x-3">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              !userId ? "User ID missing. Please log in." : isConnected ? "Type your message..." : "Connecting..."
            }
            disabled={!isConnected || sendingMessage || !userId || !!error}
            className="flex-1 border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!messageInput.trim() || !isConnected || sendingMessage || !userId || !!error}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {sendingMessage ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  )
}
