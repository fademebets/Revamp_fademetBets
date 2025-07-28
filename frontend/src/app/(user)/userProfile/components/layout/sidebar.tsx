"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Lock, Settings, User, Zap, X, ChevronRight, MessagesSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
}

// Navigation items for user profile
const navItems = [
  {
    title: "Profile",
    url: "/userProfile",
    icon: User,
    description: "Personal information",
  },
  {
    title: "EV Picks",
    url: "/user-picks",
    icon: Zap,
    description: "Expert verified picks",

  },
  {
    title: "Lock of the Day",
    url: "/user-lock-of-the-day",
    icon: Lock,
    description: "Today's guaranteed pick",

  },
  {
    title: "Messages",
    url: "/chat",
    icon: MessagesSquare,
    description: "Chat with FadeMeBets",

  },


]

export function Sidebar({ sidebarOpen, mobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname()
  const [darkMode, setDarkMode] = useState(false)

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 hidden border-r bg-white transition-all duration-300 lg:block ${
          sidebarOpen ? "w-64" : "w-0 -translate-x-full opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex h-16 items-center gap-3 border-b bg-gray-100 px-6">
          <div className="flex h-14 w-14 items-center justify-center ">
            <Image src="/logo.png" alt="FadeMeBets" width={24} height={24} className="rounded-full " />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">FadeMeBets</span>
            <span className="text-xs text-red-600 font-medium">Premium Picks</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col h-full">
          <div className="flex-1 py-6">
            <nav className="space-y-2 px-4">
              {navItems.map((item) => {
                const active = isActive(item.url)
                return (
                  <Link
                    key={item.title}
                    href={item.url}
                    className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-red-50 hover:shadow-sm ${
                      active
                        ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md"
                        : "text-gray-700 hover:text-red-600"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 text-gray-600 group-hover:bg-red-100 group-hover:text-red-600"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{item.title}</span>

                      </div>
                      <p className={`text-xs ${active ? "text-white/80" : "text-gray-500"}`}>{item.description}</p>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${active ? "text-white" : "text-gray-400"}`}
                    />
                  </Link>
                )
              })}
            </nav>
          </div>


        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen} >
        <SheetContent side="left" className="w-[85%] max-w-[300px] p-0 [&>button:first-child]:hidden">
          <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>

          {/* Mobile Header */}
          <div className="flex h-16 items-center gap-3 border-b bg-gradient-to-r from-red-50 to-red-100 px-6">
           <Link href="/" className="cursor-pointer">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-red-600 shadow-md">
                <Image src="/logo.png" alt="FadeMeBets" width={24} height={24} className="rounded" />
              </div>
            </Link>
            <div className="flex flex-col flex-1">
              <span className="text-lg font-bold text-gray-900">FadeMeBets</span>
              <span className="text-xs text-red-600 font-medium">Premium Picks</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex flex-col h-full">
            <div className="flex-1 py-6">
              <nav className="space-y-2 px-4">
                {navItems.map((item) => {
                  const active = isActive(item.url)
                  return (
                    <Link
                      key={item.title}
                      href={item.url}
                      onClick={() => setMobileOpen(false)}
                      className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-red-50 hover:shadow-sm ${
                        active
                          ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md"
                          : "text-gray-700 hover:text-red-600"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                          active
                            ? "bg-white/20 text-white"
                            : "bg-gray-100 text-gray-600 group-hover:bg-red-100 group-hover:text-red-600"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{item.title}</span>

                        </div>
                        <p className={`text-xs ${active ? "text-white/80" : "text-gray-500"}`}>{item.description}</p>
                      </div>
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${active ? "text-white" : "text-gray-400"}`}
                      />
                    </Link>
                  )
                })}
              </nav>
            </div>


          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
