"use client"

import { useState, useEffect } from "react"
import { X, Clock, Gift, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

interface CountdownPopupProps {
  isOpen: boolean
  onClose: () => void
  onClaim: (code: string) => void
  discount: number
  code: string
  timeLimit: number // in minutes
  title?: string
  subtitle?: string
}

export function DiscountCountdownPopup({
  isOpen,
  onClose,
  onClaim,
  discount,
  code,
  timeLimit,
  title = "Limited Time Offer!",
  subtitle = "Don't miss out on this exclusive deal",
}: CountdownPopupProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60) // Convert to seconds
  const [isClaimed, setIsClaimed] = useState(false)

  useEffect(() => {
    if (!isOpen || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onClose()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen, timeLeft, onClose])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleClaim = () => {
    setIsClaimed(true)
    onClaim(code)

    // Auto close after showing success
    setTimeout(() => {
      onClose()
      setIsClaimed(false)
    }, 3000)
  }

  const getUrgencyColor = () => {
    const percentage = (timeLeft / (timeLimit * 60)) * 100
    if (percentage > 50) return "text-green-600"
    if (percentage > 25) return "text-yellow-600"
    return "text-red-600"
  }

  const getProgressWidth = () => {
    return ((timeLimit * 60 - timeLeft) / (timeLimit * 60)) * 100
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Popup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative z-10 w-full max-w-md mx-4"
        >
          <Card className="overflow-hidden border-0 shadow-2xl">
            {/* Header with countdown */}
            <div className="relative bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 p-6 text-white">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 text-white hover:bg-white/20 h-8 w-8 p-0"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>

              {/* Animated elements */}
              <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-white/20"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                  >
                    <Zap className="h-4 w-4" />
                  </motion.div>
                ))}
              </div>

              <div className="relative z-10 text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-2">
                  <Gift className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="text-white/90">{subtitle}</p>

                <div className="space-y-2">
                  <Badge className="bg-white text-red-600 font-bold text-lg px-4 py-2">{discount}% OFF</Badge>

                  {/* Countdown Timer */}
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span className={`text-2xl font-mono font-bold ${getUrgencyColor()}`}>{formatTime(timeLeft)}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <motion.div
                      className="bg-white rounded-full h-2"
                      initial={{ width: 0 }}
                      animate={{ width: `${getProgressWidth()}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              {!isClaimed ? (
                <div className="space-y-4">
                  <div className="text-center space-y-2">
                    <h4 className="text-lg font-semibold text-gray-900">Hurry! This offer expires soon</h4>
                    <p className="text-gray-600">
                      Get {discount}% off your entire order with code <strong>{code}</strong>
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button
                      className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-3 text-lg"
                      onClick={handleClaim}
                    >
                      <Gift className="h-5 w-5 mr-2" />
                      Claim {discount}% OFF Now
                    </Button>

                    <div className="text-center">
                      <p className="text-xs text-gray-500">
                        ⚡ Limited time • 🍰 Valid on all cakes • 🚚 Free delivery included
                      </p>
                    </div>
                  </div>

                  {/* Urgency indicators */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 text-red-700">
                      <Zap className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {timeLeft > 300 ? "Limited time offer!" : "Offer expires very soon!"}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4 py-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                    <Gift className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Discount Claimed! 🎉</h4>
                    <p className="text-gray-600 mb-3">Your {discount}% discount has been applied!</p>
                    <Badge className="bg-green-100 text-green-800 px-4 py-2 text-lg font-mono">{code}</Badge>
                    <p className="text-sm text-gray-500 mt-2">Code copied to clipboard • Valid for next 24 hours</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

// Hook to manage discount popups - COMMENTED OUT TO PREVENT CONSTANT POPUPS
export function useDiscountPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  // COMMENTED OUT: Auto-show popup functionality
  /*
  useEffect(() => {
    // Show popup after user has been on site for 30 seconds
    const timer = setTimeout(() => {
      if (!hasShown && !localStorage.getItem("discount-popup-shown-today")) {
        setIsOpen(true)
        setHasShown(true)

        // Mark as shown for today
        const today = new Date().toDateString()
        localStorage.setItem("discount-popup-shown-today", today)
      }
    }, 30000)

    return () => clearTimeout(timer)
  }, [hasShown])
  */

  const closePopup = () => setIsOpen(false)

  const claimDiscount = (code: string) => {
    // Copy code to clipboard
    navigator.clipboard.writeText(code)

    // Store claimed discount
    localStorage.setItem(
      "claimed-discount",
      JSON.stringify({
        code,
        timestamp: Date.now(),
        discount: 20, // or whatever the discount percentage is
      }),
    )
  }

  // Manual trigger function for testing
  const showPopup = () => setIsOpen(true)

  return {
    isOpen,
    closePopup,
    claimDiscount,
    showPopup, // Added for manual testing
  }
}
