"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboardIcon,
  Lock,
  Settings,
  X,
  BadgeDollarSign,
  Users2,
  AudioWaveformIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
}

// Centralized nav config with optional group
const navLinks = [
  {
    group: "Main menu",
    links: [
      { title: "Overview", href: "/dashboard", icon: LayoutDashboardIcon },
      { title: "Lock of the Day", href: "/lock-of-the-day", icon: Lock },
      { title: "EV Picks", href: "/ev-picks", icon: AudioWaveformIcon },
    ],
  },
  {
    group: "Other menu",
    links: [
      { title: "Total Sales", href: "/total-sales", icon: BadgeDollarSign },
      { title: "All Users", href: "/all-user", icon: Users2 },
    ],
  },
  {
    group: "Help & Settings",
    links: [{ title: "Settings", href: "/settings", icon: Settings }],
  },
]

export function Sidebar({
  sidebarOpen,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string) =>
    pathname === href ? "bg-red-50 border-r border-red-400" : ""

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 hidden border-r bg-background transition-all duration-300 lg:block ${
          sidebarOpen ? "w-64" : "w-0 -translate-x-full opacity-0"
        }`}
      >
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-black text-lg font-semibold">FadeMeBets</span>
        </div>
        <div className="py-4">
          {navLinks.map((section) => (
            <div key={section.group} className="px-3 py-2">
              <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wide">
                {section.group}
              </h2>
              <div className="space-y-1">
                {section.links.map(({ title, href, icon: Icon }) => (
                  <Link
                    key={title}
                    href={href}
                    className={`flex items-center rounded-md px-4 py-2 text-sm font-medium ${isActive(
                      href
                    )}`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-0 right-0 px-6">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium">Dark mode</span>
            <Switch />
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="w-[85%] max-w-[300px] p-0 [&>button:first-child]:hidden"
        >
          <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
          <div className="flex h-16 items-center gap-2 border-b px-6">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-black text-lg font-semibold">FadeMeBets</span>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="py-4">
            {navLinks.map((section) => (
              <div key={section.group} className="px-3 py-2">
                <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wide">
                  {section.group}
                </h2>
                <div className="space-y-1">
                  {section.links.map(({ title, href, icon: Icon }) => (
                    <Link
                      key={title}
                      href={href}
                      className={`flex items-center rounded-md px-4 py-2 text-sm font-medium ${isActive(
                        href
                      )}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 left-0 right-0 px-6">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-gray-900">Dark mode</span>
              <Switch />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
