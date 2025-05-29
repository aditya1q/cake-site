"use client"

import type React from "react"

import { useState } from "react"
import { X, Gift, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

interface ExitIntentPopupProps {
  isOpen: boolean
  onClose: () => void
  onSubscribe: (email: string) => void
}

export function ExitIntentPopup({ isOpen, onClose, onSubscribe }: ExitIntentPopupProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onSubscribe(email)
    setIsSubmitted(true)
    setIsSubmitting(false)

    // Auto close after success
    setTimeout(() => {
      onClose()
      setIsSubmitted(false)
      setEmail("")
    }, 2000)
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
            <div className="relative bg-gradient-to-br from-rose-500 via-pink-500 to-orange-400 p-6 text-white">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 text-white hover:bg-white/20 h-8 w-8 p-0"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-2">
                  <Gift className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold">Wait! Don't Leave Yet!</h3>
                <p className="text-white/90">Get 15% OFF your first order + exclusive cake recipes!</p>
                <Badge className="bg-yellow-400 text-yellow-900 font-bold px-3 py-1">LIMITED TIME OFFER</Badge>
              </div>
            </div>

            <CardContent className="p-6">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="exit-email" className="text-sm font-medium text-gray-700">
                      Enter your email for instant discount
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="exit-email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 border-rose-200 focus:border-rose-400"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Getting Your Discount..." : "Get 15% OFF Now"}
                  </Button>

                  <div className="text-center space-y-2">
                    <p className="text-xs text-gray-500">
                      ✨ Instant discount code • 🍰 Exclusive recipes • 📧 No spam, unsubscribe anytime
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-gray-600 text-xs"
                      onClick={onClose}
                    >
                      No thanks, I'll pay full price
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="text-center space-y-4 py-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                    <Gift className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Welcome to KyraBakers! 🎉</h4>
                    <p className="text-gray-600 mb-3">Check your email for your 15% discount code!</p>
                    <Badge className="bg-green-100 text-green-800 px-3 py-1">SWEET15 - Your Discount Code</Badge>
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
