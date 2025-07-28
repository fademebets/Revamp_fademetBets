import { getCookie, deleteCookie, setCookie } from "cookies-next"
import { toast } from "sonner"
import type { User } from "@/types/auth"

export const authUtils = {
  // Get user data from cookies
  getUser(): User | null {
    const token = getCookie("auth-token")
    const role = getCookie("user-role")
    const subscriptionStatus = getCookie("subscription-status")
    const userId = getCookie("user-id")  // <-- Added userId

    if (!token || !role || !userId) {
      return null
    }

    return {
      token: token as string,
      role: role as "user" | "admin",
      subscriptionStatus: (subscriptionStatus as string) || "inactive",
      userId: userId as string,           // <-- Return userId
    }
  },

  // Save user data to cookies
  saveUser(user: User): void {
    setCookie("auth-token", user.token, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })

    setCookie("user-role", user.role, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })

    setCookie("subscription-status", user.subscriptionStatus, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })

    setCookie("user-id", user.userId, {    // <-- Save userId here
      maxAge: 30 * 24 * 60 * 60, // 30 days
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!getCookie("auth-token")
  },

  // Check if user has admin role
  isAdmin(): boolean {
    const role = getCookie("user-role")
    return role === "admin"
  },

  // Logout user by clearing cookies
  logout(): void {
    this.clearAllAuthData()
    toast.success("Successfully logged out!")
  },

  // Get auth token
  getToken(): string | null {
    return (getCookie("auth-token") as string) || null
  },

  // Clear all auth cookies (more comprehensive)
  clearAllAuthData(): void {
    // Clear main auth cookies
    deleteCookie("auth-token")
    deleteCookie("user-role")
    deleteCookie("subscription-status")
    deleteCookie("user-id")   // <-- Also delete userId cookie

    // Clear any other potential auth-related cookies
    deleteCookie("remember-me")
    deleteCookie("session-id")

    // Clear from all possible paths and domains
    deleteCookie("auth-token", { path: "/" })
    deleteCookie("user-role", { path: "/" })
    deleteCookie("subscription-status", { path: "/" })
    deleteCookie("user-id", { path: "/" })
  },
}
