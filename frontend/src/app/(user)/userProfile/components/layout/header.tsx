"use client"

import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  setMobileOpen: (open: boolean) => void
  pageTitle?: string
  setIsLoggingOut: (value: boolean) => void
}

export function Header({
  sidebarOpen,
  setSidebarOpen,
  setMobileOpen,
  pageTitle = "User Profile",
}: HeaderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {



    setMounted(true)
  }, [])

  // const handleLogout = async () => {
  //   try {
  //     setIsLoggingOut(true)



  //     setTimeout(() => {
  //       setIsLoggingOut(false)
  //       router.replace("/login")
  //     }, 2000)
  //   } catch (e) {
  //     setIsLoggingOut(false)
  //     console.error("Logout failed", e)
  //     // Show an error toast or handle logout failure logic here
  //   }
  // }

  if (!mounted) {
    return null
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
    onClick={() => console.log("Logout clicked")}
  >
    Logout
  </Button>
</div>

    </header>
  )
}
