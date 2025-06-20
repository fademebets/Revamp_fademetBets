"use client"

import { useState } from "react"
import { ChevronDown, Globe } from "lucide-react"

interface LanguageSelectorProps {
  language: string
  setLanguage: (lang: string) => void
}

export default function LanguageSelector({ language, setLanguage }: LanguageSelectorProps) {
  const [open, setOpen] = useState(false)

  const toggleDropdown = () => setOpen(!open)

  const selectLanguage = (lang: string) => {
    setLanguage(lang)
    setOpen(false)
    // You can add your logic to change language here (e.g., i18n)
  }

  return (
    <div className="relative inline-block text-white text-sm">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-1 hover:text-green-400 transition-colors focus:outline-none"
      >
        <Globe className="w-4 h-4" />
        <span>{language}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-black border border-gray-700 rounded shadow-lg z-50">
          <button
            onClick={() => selectLanguage("English")}
            className="block w-full text-left px-4 py-2 hover:bg-green-500 hover:text-white"
          >
            English
          </button>
          <button
            onClick={() => selectLanguage("Spanish")}
            className="block w-full text-left px-4 py-2 hover:bg-green-500 hover:text-white"
          >
            Spanish
          </button>
        </div>
      )}
    </div>
  )
}
