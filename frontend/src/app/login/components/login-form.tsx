"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { setCookie } from "cookies-next"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, LogIn, Eye, EyeOff, Loader2 } from "lucide-react"
import Image from "next/image"

import { authApi, ApiError } from "@/lib/userApi"
import type { LoginRequest } from "@/types/auth"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  })

  const [isRedirecting, setIsRedirecting] = useState(false)

  const router = useRouter()

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: name === "email" ? value.toLowerCase() : value, // force email to lowercase
  }));

  if (error) {
    setError("");
  }
};
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await authApi.login(formData)

      // Show success toast
      toast.success("Login successful! Redirecting...")

      // Save token and role in cookies
      setCookie("auth-token", response.token, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })

      setCookie("user-role", response.role, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })

      setCookie("subscription-status", response.subscriptionStatus, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })

      // Set redirecting state
      setIsRedirecting(true)

      // Small delay to show the success message before redirect
      setTimeout(() => {
        // Redirect based on role
        if (response.role === "admin") {
          router.push("/dashboard")
        } else {
          router.push("/userProfile")
        }
      }, 1000)
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 401) {
          toast.error("Invalid email or password")
          setError("Invalid email or password")
        } else if (error.status === 0) {
          toast.error("Unable to connect to server. Please try again.")
          setError("Unable to connect to server. Please try again.")
        } else {
          toast.error(error.message || "Login failed. Please try again.")
          setError(error.message || "Login failed. Please try again.")
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.")
        setError("An unexpected error occurred. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-8", className)} {...props}>
      {/* Loading Overlay */}
      {isRedirecting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4 max-w-sm mx-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-red-100 border-t-red-600 rounded-full animate-spin"></div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome back!</h3>
              <p className="text-sm text-gray-600">Redirecting you to your dashboard...</p>
            </div>
          </div>
        </div>
      )}
      <Card className="border-none shadow-xl bg-white rounded-2xl">
        <CardHeader className="text-center space-y-4">
          {/* Logo Image */}
          <div className="flex justify-center">
            <Image
              width={90}
              height={90}
              src="/logo.png"
              alt="App Logo"
              className="h-14 w-14 rounded-full object-contain"
            />
          </div>
          <CardTitle className="text-3xl font-bold text-red-600">Welcome Back</CardTitle>
          <CardDescription className="text-gray-500">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">{error}</div>
              )}

              <div className="grid gap-3">
                <Label htmlFor="email" className="text-base text-gray-800">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="pl-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-base text-gray-800">
                    Password
                  </Label>
                  <a href="#" className="ml-auto text-sm text-red-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="pl-10 pr-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#D92A1B] hover:bg-[#1c1c1c] text-white h-12 text-base font-semibold disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-5 w-5" />
                      Login
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <a href="#" className="text-red-600 hover:underline font-medium">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
