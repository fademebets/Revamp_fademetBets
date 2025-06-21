"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import MobileMenu from "./mobile-menu"
import LanguageSelector from "./language-selector"

const navItems = ["Home", "About", "What We Do", "Stories", "Contact"]

export default function Navbar() {
  const [language, setLanguage] = useState("English")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-all ${
        isScrolled
          ? "backdrop-blur-lg bg-black/40 border-b border-gray-400"
          : "bg-transparent border-b border-transparent"
      }`}
    >
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
          <span className="text-white text-lg font-semibold">FadeMeBets</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={`/${item === "Home" ? "" : item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-white hover:text-green-400 transition-colors text-sm font-medium"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSelector language={language} setLanguage={setLanguage} />
          <Button className="bg-primary text-white px-5 py-2 text-sm rounded-lg">
            Login Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <MobileMenu navItems={navItems} language={language} setLanguage={setLanguage} />
        </div>
      </div>
    </nav>
  )
}
