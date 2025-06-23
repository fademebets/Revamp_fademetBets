"use client"

import { useState, useEffect } from "react"
import { Menu, Search, LogOut, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

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
  pageTitle = "Overview",
  setIsLoggingOut,
}: HeaderProps) {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {



    setMounted(true)
  }, [])

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)



      setTimeout(() => {
        setIsLoggingOut(false)
        router.replace("/login")
      }, 2000)
    } catch (e) {
      setIsLoggingOut(false)
      console.error("Logout failed", e)
      // Show an error toast or handle logout failure logic here
    }
  }

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
        <form className="hidden sm:block">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search" className="w-[140px] pl-8 md:w-[200px] lg:w-[300px]" />
          </div>
        </form>
        <Button variant="ghost" size="icon" className="sm:hidden">
          <Search className="h-5 w-5" />
        </Button>

        {/* Avatar with dropdown */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8 bg-[#c8102e]">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt={"User"} />
                <AvatarFallback className="bg-[#c8102e] text-white">U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>{"User"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
