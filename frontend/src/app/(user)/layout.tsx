"use client"

import type React from "react"
import { useState } from "react"

import { Sidebar } from "./userProfile/components/layout/sidebar"
import { Header } from "./userProfile/components/layout/header"
import { LogoutOverlay } from "@/components/ui/logout-overlay"

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div
        className={`flex w-full flex-col transition-all duration-300 ${
          sidebarOpen ? "lg:pl-64" : "lg:pl-0"
        }`}
      >
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setMobileOpen={setMobileOpen}
          setIsLoggingOut={setIsLoggingOut}
        />

        <main className="flex flex-1 flex-col gap-4 p-3 md:gap-6 md:p-6 lg:gap-8 lg:p-8">
          {children}
        </main>
      </div>

      {/* Logout overlay here */}
      <LogoutOverlay isLoggingOut={isLoggingOut} />
    </div>
  )
}
