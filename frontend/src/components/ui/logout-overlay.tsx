"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LogoutOverlayProps {
  isLoggingOut: boolean
}

export function LogoutOverlay({ isLoggingOut }: LogoutOverlayProps) {
  // Prevent scrolling when overlay is active
  useEffect(() => {
    if (isLoggingOut) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isLoggingOut])

  return (
    <AnimatePresence>
      {isLoggingOut && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }} // Apple-like cubic-bezier
          className="fixed inset-0 z-[100] backdrop-blur-md bg-white/70 dark:bg-black/70 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col items-center"
          >
            {/* Apple-style loading spinner */}
            <div className="relative w-12 h-12">
              <motion.div
                className="absolute inset-0 border-t-2 border-r-2 border-forestGreen rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute inset-0 border-t-2 border-r-2 border-forestGreen rounded-full opacity-30"
                initial={{ rotate: 45 }}
                animate={{ rotate: 405 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: 0.1,
                }}
              />
            </div>

            {/* Typewriter text effect */}
            <div className="h-8 mt-6 overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="relative"
              >
                <motion.p
                  className="text-base font-light tracking-wide text-gray-800 dark:text-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Logging Out
                </motion.p>
                <motion.span
                  className="absolute top-0 right-[-12px] inline-block w-[4px] h-[20px] bg-forestGreen"
                  animate={{
                    opacity: [1, 0, 1],
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 8, 16, 24],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    times: [0, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.92, 0.96, 1],
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
