"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Menu, Home, Info, Calculator} from "lucide-react"
import LanguageSelector from "./language-selector"
import { Separator } from "@/components/ui/separator"
import type { User } from "@/types/auth"

interface MobileMenuProps {
  navItems: string[]
  language: string
  setLanguage: (language: string) => void
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  onAuthClick: () => void
  isDark: boolean
  currentPath: string
}

const getNavIcon = (item: string) => {
  switch (item.toLowerCase()) {
    case "home":
      return <Home className="h-4 w-4" />
    case "about":
      return <Info className="h-4 w-4" />
    case "parley calc":
    case "ev calc":
      return <Calculator className="h-4 w-4" />
    default:
      return null
  }
}



export default function MobileMenu({
  navItems,
  language,
  setLanguage,
  user,
  isAuthenticated,
  isLoading,
  onAuthClick,
  isDark,
  currentPath,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getButtonText = () => {
    if (isLoading) return "Loading..."
    if (isAuthenticated && user) {
      return user.role === "admin" ? "Admin Panel" : "Dashboard"
    }
    return "Login Now"
  }

  const handleAuthClick = () => {
    setIsOpen(false)
    onAuthClick()
  }



  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`${isDark ? "text-white hover:bg-white/10" : "text-gray-900 hover:bg-gray-100"} transition-colors`}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[320px] bg-white border-l border-gray-200 p-0">
        <SheetHeader className="px-6 py-4 border-b border-gray-100">
          <SheetTitle className="text-left text-gray-900 font-semibold">Navigation Menu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Navigation Links */}
          <div className="flex-1 px-6 py-4">
            <div className="space-y-1">
              {navItems.map((item, idx) => {
                const href = `/${item === "Home" ? "" : item.toLowerCase().replace(/\s+/g, "-")}`
                const isActive = currentPath === href

                return (
                  <Link
                    key={idx}
                    href={href}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {getNavIcon(item)}
                    <span>{item}</span>
                    {isActive && <div className="ml-auto w-2 h-2 bg-red-500 rounded-full" />}
                  </Link>
                )
              })}
            </div>

            <Separator className="my-6" />

            {/* Language Selector */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Language</h3>
              <LanguageSelector language={language} setLanguage={setLanguage} isDark={false} />
            </div>

          </div>

          {/* Bottom Actions */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
            <Button
              onClick={handleAuthClick}
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-800 text-white py-3 text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              <div className="flex items-center justify-center space-x-2">

                    <span>{getButtonText()}</span>

              </div>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
