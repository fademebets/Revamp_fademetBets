"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import MobileMenu from "./mobile-menu"
import LanguageSelector from "./language-selector"
import { useRouter, usePathname } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"

const navItems = ["Home", "About", "Services" ,"Parley Calc", "EV Calc", "Blog"]

export default function Navbar() {
  const [language, setLanguage] = useState("English")
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { user, isAuthenticated, isLoading, checkAuth } = useAuthStore()

  // Check if we're on the home page
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Check auth status on component mount
    checkAuth()
  }, [checkAuth])

  const handleAuthButtonClick = () => {
    if (isAuthenticated && user) {
      // Redirect based on user role
      if (user.role === "admin") {
        router.push("/dashboard")
      } else {
        router.push("/userProfile")
      }
    } else {
      router.push("/login")
    }
  }

  const getButtonText = () => {
    if (isLoading) return "Loading..."
    if (isAuthenticated && user) {
      return user.role === "admin" ? "Admin Panel" : "Dashboard"
    }
    return "Login Now"
  }

  // Dynamic styling based on page and scroll state
  const getNavbarStyles = () => {
    if (isHomePage) {
      return isScrolled
        ? "backdrop-blur-lg bg-black/40 border-b border-gray-400"
        : "bg-transparent border-b border-transparent"
    } else {
      return isScrolled
        ? "bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm"
        : "bg-white border-b border-gray-200"
    }
  }

  const getTextColor = () => {
    return isHomePage ? "text-white" : "text-gray-900"
  }

  const getHoverColor = () => {
    return isHomePage ? "hover:text-red-400" : "hover:text-red-600"
  }

  return (
    <nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${getNavbarStyles()}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="FadeMeBets Logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
            priority
          />
          <span className={`text-lg font-semibold ${getTextColor()}`}>FadeMeBets</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, idx) => {
            const href = `/${item === "Home" ? "" : item.toLowerCase().replace(/\s+/g, "-")}`
            const isActive = pathname === href

            return (
              <Link
                key={idx}
                href={href}
                className={`${getTextColor()} ${getHoverColor()} transition-colors text-sm font-medium relative ${
                  isActive ? (isHomePage ? "text-red-400" : "text-red-600") : ""
                }`}
              >
                {item}
                {isActive && (
                  <span
                    className={`absolute -bottom-1 left-0 w-full h-0.5 ${
                      isHomePage ? "bg-red-400" : "bg-red-600"
                    } rounded-full`}
                  />
                )}
              </Link>
            )
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSelector language={language} setLanguage={setLanguage} isDark={isHomePage} />
          <Button
            onClick={handleAuthButtonClick}
            disabled={isLoading}
            className={`px-5 py-2 text-sm cursor-pointer rounded-lg font-medium transition-all duration-200 disabled:opacity-50 ${
              isHomePage ? "bg-red-600 hover:bg-red-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {getButtonText()}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <MobileMenu
            navItems={navItems}
            language={language}
            setLanguage={setLanguage}
            user={user}
            isAuthenticated={isAuthenticated}
            isLoading={isLoading}
            onAuthClick={handleAuthButtonClick}
            isDark={isHomePage}
            currentPath={pathname}
          />
        </div>
      </div>
    </nav>
  )
}
