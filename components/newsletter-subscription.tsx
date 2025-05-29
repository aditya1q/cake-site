"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Gift, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

interface NewsletterSubscriptionProps {
  variant?: "modal" | "banner" | "inline"
  isOpen?: boolean
  onClose?: () => void
  className?: string
}

export function NewsletterSubscription({
  variant = "inline",
  isOpen = true,
  onClose,
  className = "",
}: NewsletterSubscriptionProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    // Simulate Mailchimp/ConvertKit API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Here you would integrate with Mailchimp or ConvertKit
    console.log("Subscribing email:", email)

    setIsSubmitted(true)
    setIsSubmitting(false)

    // Auto close/reset after success
    setTimeout(() => {
      if (variant === "modal" && onClose) {
        onClose()
      }
      setIsSubmitted(false)
      setEmail("")
    }, 3000)
  }

  const handleDismiss = () => {
    setIsDismissed(true)
    if (onClose) onClose()
  }

  if (variant === "banner" && (isDismissed || !isOpen)) return null

  const content = (
    <div className={`${variant === "banner" ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white" : ""}`}>
      {!isSubmitted ? (
        <div className={`${variant === "banner" ? "py-3 px-4" : "space-y-4"}`}>
          <div className={`${variant === "banner" ? "flex items-center justify-between" : "text-center space-y-3"}`}>
            <div className={`${variant === "banner" ? "flex items-center space-x-3" : ""}`}>
              {variant !== "banner" && (
                <div className="inline-flex items-center justify-center w-12 h-12 bg-rose-100 rounded-full mb-2">
                  <Mail className="h-6 w-6 text-rose-600" />
                </div>
              )}
              <div>
                <h3 className={`font-bold ${variant === "banner" ? "text-lg" : "text-xl"}`}>
                  {variant === "banner" ? "🍰 Get Sweet Deals!" : "Join Our Sweet Community"}
                </h3>
                <p className={`${variant === "banner" ? "text-sm text-white/90" : "text-gray-600"}`}>
                  {variant === "banner"
                    ? "Subscribe for exclusive offers & new cake alerts!"
                    : "Get exclusive recipes, offers, and cake decorating tips delivered to your inbox!"}
                </p>
              </div>
            </div>

            <div className={`${variant === "banner" ? "flex items-center space-x-2" : ""}`}>
              <form onSubmit={handleSubmit} className={`${variant === "banner" ? "flex space-x-2" : "space-y-3"}`}>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${variant === "banner" ? "w-64 bg-white text-gray-900" : "border-rose-200 focus:border-rose-400"}`}
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${variant === "banner" ? "bg-white text-rose-600 hover:bg-gray-100" : "bg-rose-600 hover:bg-rose-700 text-white w-full"}`}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>

              {variant === "banner" && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                  onClick={handleDismiss}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {variant !== "banner" && (
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <Gift className="h-4 w-4" />
                <span>Exclusive offers</span>
              </span>
              <span>•</span>
              <span>No spam</span>
              <span>•</span>
              <span>Unsubscribe anytime</span>
            </div>
          )}
        </div>
      ) : (
        <div className={`${variant === "banner" ? "py-3 px-4 text-center" : "text-center space-y-3 py-4"}`}>
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h4 className="font-bold text-lg">Welcome to our sweet family! 🎉</h4>
            <p className={`${variant === "banner" ? "text-sm text-white/90" : "text-gray-600"}`}>
              Check your email for a special welcome offer!
            </p>
          </div>
        </div>
      )}
    </div>
  )

  if (variant === "modal") {
    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={onClose}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-10 w-full max-w-md mx-4"
            >
              <Card>
                <CardContent className="p-6">
                  <Button variant="ghost" size="sm" className="absolute top-2 right-2 h-8 w-8 p-0" onClick={onClose}>
                    <X className="h-4 w-4" />
                  </Button>
                  {content}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    )
  }

  if (variant === "banner") {
    return (
      <AnimatePresence>
        {isOpen && !isDismissed && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-40"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <Card className={className}>
      <CardContent className="p-6">{content}</CardContent>
    </Card>
  )
}
