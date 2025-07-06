"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResetPasswordModal } from "./reset-password-modal"
import { toast } from "sonner"
import { ArrowLeft, Mail, Loader2 } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showResetModal, setShowResetModal] = useState(false)

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast.error("Please enter your email address")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("https://revamp-fademetbets.onrender.com/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Reset code sent to your email!", {
          description: "Check your inbox for the verification code",
          duration: 4000,
        })
        setShowResetModal(true)
      } else {
        toast.error(data.message || "Failed to send reset code")
      }
    } catch (error) {
      toast.error("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-4 overflow-hidden">

  {/* Decorative gradient circles */}
  <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-gradient-to-br from-red-200 to-red-400 rounded-full filter blur-3xl opacity-40 animate-pulse"></div>

  <div className="absolute bottom-[-150px] right-[-150px] w-[350px] h-[350px] bg-gradient-to-br from-red-300 to-pink-400 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>

  <div className="absolute top-1/3 left-[60%] w-[250px] h-[250px] bg-gradient-to-br from-pink-200 to-red-300 rounded-full filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
            <CardDescription className="text-gray-600">
              No worries! Enter your email and we'll send you a reset code.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                  required
                />
              </div>

              <Button type="submit" className="w-full h-11 bg-red-600 hover:bg-red-700" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Reset Code...
                  </>
                ) : (
                  "Send Reset Code"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="inline-flex items-center hover:underline text-sm text-red-600 hover:text-red-700 font-medium"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <ResetPasswordModal isOpen={showResetModal} onClose={() => setShowResetModal(false)} email={email} />
    </div>
  )
}
