"use client"

import Link from "next/link"
import { Globe, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { usePathname } from "next/navigation"

interface MobileMenuProps {
  navItems: string[]
  language: string
  setLanguage: (lang: string) => void
}

export default function MobileMenu({ navItems}: MobileMenuProps) {
  const toggleDropdown = () => {
    // Your language dropdown toggle logic
  }

  const pathname = usePathname()
const isHome = pathname === "/"
  return (
    <Sheet>
     <SheetTrigger asChild>
  <Button
    variant="ghost"
    size="icon"
    className={`${isHome ? "text-white" : "text-black"}`}
  >
    <Menu className="h-6 w-6" />
  </Button>
</SheetTrigger>
      <SheetContent side="right" className="bg-black/90 backdrop-blur-sm border-l border-gray-800 w-64 px-5">
        <SheetTitle></SheetTitle>

        {/* Close button */}
        <div className="flex justify-end mt-4">
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <X className="h-8 w-8" />
            </Button>
          </SheetClose>
        </div>

        <div className="flex flex-col space-y-6 mt-8 px-10">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={`/${item === "Home" ? "" : item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-white hover:text-green-400 transition-colors text-lg font-medium"
            >
              {item}
            </Link>
          ))}

          <div className="pt-6 border-t border-gray-800 space-y-4">
            {/* Language selector button */}
            <button
              onClick={toggleDropdown}
              className="text-white hover:text-green-400 transition-colors flex items-center space-x-2 text-base focus:outline-none"
            >
              <Globe className="w-4 h-4" />
              <span>EN</span>
            </button>

            <Button className="bg-[#A1CF5F] hover:bg-[#8AB94F] text-white w-full text-base py-2.5 rounded-lg">
              Online Now
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
