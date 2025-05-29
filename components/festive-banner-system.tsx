"use client"

import { useState, useEffect } from "react"
import { X, Gift, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

interface FestiveOffer {
  id: string
  title: string
  subtitle: string
  discount: string
  code: string
  startDate: Date
  endDate: Date
  festival: string
  bgGradient: string
  textColor: string
  emoji: string
  isActive: boolean
}

// Festive offers configuration
const festiveOffers: FestiveOffer[] = [
  {
    id: "diwali-2024",
    title: "Diwali Sweet Celebration",
    subtitle: "Light up your celebrations with our special cakes",
    discount: "25% OFF",
    code: "DIWALI25",
    startDate: new Date("2024-10-25"),
    endDate: new Date("2024-11-15"),
    festival: "Diwali",
    bgGradient: "from-orange-500 via-yellow-500 to-red-500",
    textColor: "text-white",
    emoji: "🪔",
    isActive: true,
  },
  {
    id: "christmas-2024",
    title: "Christmas Magic",
    subtitle: "Make your Christmas sweeter with our festive cakes",
    discount: "30% OFF",
    code: "XMAS30",
    startDate: new Date("2024-12-15"),
    endDate: new Date("2024-12-26"),
    festival: "Christmas",
    bgGradient: "from-red-600 via-green-600 to-red-600",
    textColor: "text-white",
    emoji: "🎄",
    isActive: false,
  },
  {
    id: "newyear-2025",
    title: "New Year Celebration",
    subtitle: "Start the year sweet with our special offers",
    discount: "20% OFF",
    code: "NEWYEAR20",
    startDate: new Date("2024-12-28"),
    endDate: new Date("2025-01-05"),
    festival: "New Year",
    bgGradient: "from-purple-600 via-blue-600 to-purple-600",
    textColor: "text-white",
    emoji: "🎊",
    isActive: false,
  },
  {
    id: "valentine-2025",
    title: "Valentine's Special",
    subtitle: "Sweeten your love with our romantic cakes",
    discount: "15% OFF",
    code: "LOVE15",
    startDate: new Date("2025-02-10"),
    endDate: new Date("2025-02-16"),
    festival: "Valentine's Day",
    bgGradient: "from-pink-500 via-rose-500 to-red-500",
    textColor: "text-white",
    emoji: "💕",
    isActive: false,
  },
  {
    id: "holi-2025",
    title: "Holi Colors & Flavors",
    subtitle: "Celebrate with colorful and delicious cakes",
    discount: "22% OFF",
    code: "HOLI22",
    startDate: new Date("2025-03-10"),
    endDate: new Date("2025-03-16"),
    festival: "Holi",
    bgGradient: "from-blue-500 via-green-500 to-yellow-500",
    textColor: "text-white",
    emoji: "🌈",
    isActive: false,
  },
]

interface FestiveBannerSystemProps {
  position?: "top" | "bottom"
  autoShow?: boolean
  className?: string
}

export function FestiveBannerSystem({ position = "top", autoShow = true, className = "" }: FestiveBannerSystemProps) {
  const [currentOffer, setCurrentOffer] = useState<FestiveOffer | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const checkActiveOffers = () => {
      const now = new Date()
      const activeOffer = festiveOffers.find((offer) => {
        const isInDateRange = now >= offer.startDate && now <= offer.endDate
        const notDismissed = !localStorage.getItem(`dismissed-${offer.id}`)
        const notShownToday = !localStorage.getItem(`shown-today-${offer.id}`)
        return isInDateRange && notDismissed && notShownToday && offer.isActive
      })

      if (activeOffer && autoShow) {
        setCurrentOffer(activeOffer)
        setIsVisible(true)
        // Mark as shown today
        localStorage.setItem(`shown-today-${activeOffer.id}`, new Date().toDateString())
      }
    }

    // Only check on component mount, not repeatedly
    checkActiveOffers()
  }, [autoShow]) // Remove the interval

  const handleDismiss = () => {
    if (currentOffer) {
      localStorage.setItem(`dismissed-${currentOffer.id}`, "true")
      localStorage.setItem(`shown-today-${currentOffer.id}`, new Date().toDateString())
    }
    setIsDismissed(true)
    setIsVisible(false)
  }

  const handleCopyCode = () => {
    if (currentOffer) {
      navigator.clipboard.writeText(currentOffer.code)
      // You could show a toast notification here
    }
  }

  const getTimeRemaining = () => {
    if (!currentOffer) return ""

    const now = new Date()
    const timeLeft = currentOffer.endDate.getTime() - now.getTime()

    if (timeLeft <= 0) return "Expired"

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (days > 0) {
      return `${days}d ${hours}h left`
    } else {
      return `${hours}h left`
    }
  }

  if (!currentOffer || !isVisible || isDismissed) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: position === "top" ? -100 : 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: position === "top" ? -100 : 100, opacity: 0 }}
        className={`fixed ${position === "top" ? "top-0" : "bottom-0"} left-0 right-0 z-50 ${className}`}
      >
        <div
          className={`bg-gradient-to-r ${currentOffer.bgGradient} ${currentOffer.textColor} relative overflow-hidden`}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                >
                  {currentOffer.emoji}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative z-10 px-4 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{currentOffer.emoji}</div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-lg">{currentOffer.title}</h3>
                    <Badge className="bg-white/20 text-white border-white/30">{currentOffer.discount}</Badge>
                  </div>
                  <p className="text-sm opacity-90">{currentOffer.subtitle}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span className="font-semibold">{getTimeRemaining()}</span>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  onClick={handleCopyCode}
                >
                  <Gift className="h-4 w-4 mr-2" />
                  Use Code: {currentOffer.code}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                  onClick={handleDismiss}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Hook to get current festive offers
export function useFestiveOffers() {
  const [offers, setOffers] = useState<FestiveOffer[]>([])

  useEffect(() => {
    const now = new Date()
    const activeOffers = festiveOffers.filter(
      (offer) => now >= offer.startDate && now <= offer.endDate && offer.isActive,
    )
    setOffers(activeOffers)
  }, [])

  return offers
}
