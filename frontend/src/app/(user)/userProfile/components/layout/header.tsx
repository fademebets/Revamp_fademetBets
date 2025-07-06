"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { deleteCookie } from "cookies-next"
import { toast } from "sonner"

interface HeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  setMobileOpen: (open: boolean) => void
  pageTitle?: string
    setIsLoggingOut: React.Dispatch<React.SetStateAction<boolean>>
}

export function Header({
  sidebarOpen,
  setSidebarOpen,
  setMobileOpen,
  pageTitle = "User Profile",
  setIsLoggingOut,
}: HeaderProps) {

 const router = useRouter()

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)

      // Show logout toast
      toast.success("Logging out...")

      // Clear all auth cookies
      deleteCookie("auth-token")
      deleteCookie("user-role")
      deleteCookie("subscription-status")

      // Wait for 2 seconds to show loading animation
      setTimeout(() => {
        setIsLoggingOut(false)
        router.replace("/login")
        toast.success("Successfully logged out!")
      }, 2000)
    } catch (e) {
      setIsLoggingOut(false)
      console.error("Logout failed", e)
      toast.error("Logout failed. Please try again.")
    }
  }


  return (

    <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b bg-background px-2 sm:px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hidden lg:flex" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center text-sm font-medium text-muted-foreground">
          <span className="hidden sm:inline">FadeMeBets</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-1 h-4 w-4 sm:mx-2"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="font-medium text-foreground">{pageTitle}</span>
        </div>
      </div>
<div className="ml-auto flex items-center gap-1 sm:gap-2 md:gap-4">
  {/* Avatar with dropdown can go here */}

  <Button
    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
    onClick={handleLogout}
  >
    Logout
  </Button>
</div>

    </header>
  )
}
