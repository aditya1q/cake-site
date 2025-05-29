"use client"

import { useState, useEffect } from "react"
import { X, Gift, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"

export function WelcomeBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    // Check if banner was shown today for this user
    const today = new Date().toDateString()
    const bannerKey = `welcome-banner-${user.id || user.email}-${today}`
    const hasSeenToday = localStorage.getItem(bannerKey)

    // Check if this is user's first time (ever)
    const firstTimeKey = `first-time-user-${user.id || user.email}`
    const isFirstTime = !localStorage.getItem(firstTimeKey)

    if (isFirstTime || !hasSeenToday) {
      setIsVisible(true)

      // Mark as seen
      localStorage.setItem(bannerKey, "true")
      if (isFirstTime) {
        localStorage.setItem(firstTimeKey, "true")
      }
    }
  }, [user])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
      setIsClosing(false)
    }, 300)
  }

  if (!isVisible || !user) return null

  const firstName = user.user_metadata?.full_name?.split(" ")[0] || user.email?.split("@")[0] || "there"

  return (
    <div
      className={`relative bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white transition-all duration-300 ${
        isClosing ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 animate-pulse" />
              <Gift className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm md:text-base font-medium">
                Welcome back, {firstName}! 🎉<span className="ml-2 font-bold">Get 15% OFF</span> your next order with
                code:
                <span className="ml-1 bg-white text-rose-600 px-2 py-1 rounded font-bold text-xs">WELCOME15</span>
              </p>
            </div>
          </div>

          <Button variant="ghost" size="sm" onClick={handleClose} className="text-white hover:bg-white/20 h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
    </div>
  )
}
