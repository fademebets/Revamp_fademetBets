"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Globe } from "lucide-react"

interface LanguageSelectorProps {
  language: string
  setLanguage: (language: string) => void
  isDark?: boolean
}

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },

]

export default function LanguageSelector({ language, setLanguage, isDark = false }: LanguageSelectorProps) {
  const currentLanguage = languages.find((lang) => lang.name === language) || languages[0]

  return (
    <DropdownMenu modal={false} >
      <DropdownMenuTrigger asChild >
        <Button
          variant="ghost"
          size="sm"
          className={`${
            isDark ? "text-white hover:bg-white/10 border-white/20 hover:text-white" : "text-black hover:text-black hover:bg-gray-100 border-gray-200"
          } border transition-colors`}
        >
          <Globe className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">{currentLanguage.flag}</span>
          <span className="ml-1 text-xs">{currentLanguage.code.toUpperCase()}</span>
          <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.name)}
            className={`flex items-center space-x-2 ${language === lang.name ? "bg-red-50 text-red-700" : ""}`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
            {language === lang.name && <div className="ml-auto w-2 h-2 bg-red-500 rounded-full" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
