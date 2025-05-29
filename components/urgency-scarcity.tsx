"use client"

import { useState, useEffect } from "react"
import { Clock, Flame, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface UrgencyScarcityProps {
  stockLeft?: number
  isFlashDeal?: boolean
  flashDealEndTime?: Date
  viewersCount?: number
  className?: string
  index?: number
}

export function UrgencyScarcity({
  stockLeft = 5,
  isFlashDeal = false,
  flashDealEndTime,
  viewersCount = 12,
  className = "",
  index
}: UrgencyScarcityProps) {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number
    minutes: number
    seconds: number
  } | null>(null)

  useEffect(() => {
    if (!isFlashDeal || !flashDealEndTime) return

    const updateTimer = () => {
      const now = new Date().getTime()
      const endTime = flashDealEndTime.getTime()
      const difference = endTime - now

      if (difference > 0) {
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ hours, minutes, seconds })
      } else {
        setTimeLeft(null)
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [isFlashDeal, flashDealEndTime])

  const getStockColor = () => {
    if (stockLeft <= 3) return "bg-red-100 text-red-700 border-red-200"
    if (stockLeft <= 5) return "bg-orange-100 text-orange-700 border-orange-200"
    if (stockLeft <= 10) return "bg-yellow-100 text-yellow-700 border-yellow-200"
    return "bg-green-100 text-green-700 border-green-200"
  }

  const getStockIcon = () => {
    if (stockLeft <= 3) return "🔥"
    if (stockLeft <= 5) return "⚡"
    return "📦"
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Stock Scarcity */}
      {index === 4 && (
        <Card className={`border ${getStockColor()}`}>
          <CardContent className="p-1">
            <div className="flex items-center space-x-2">
              <button className="text-sm">{getStockIcon()}</button>
              <div className="flex-1">
                <h1 className="font-semibold text-xs">{stockLeft <= 3 ? "Almost Sold Out!" : "Limited Stock"}</h1>
                <p className="text-xs">Only {stockLeft} left in stock - order soon!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Flash Deal Timer */}
      {isFlashDeal && timeLeft && (
        <Card className="border-red-200 bg-gradient-to-r from-red-50 to-orange-50">
          <CardContent className="p-1">
            <div className="flex items-center space-x-2">
              <Flame className="h-2 w-5 text-red-500" />
              <div className="flex-1">
                <div className="font-semibold text-xs text-red-700">Flash Deal Ends In:</div>
                <div className="flex items-center space-x-1 mt-1">
                  <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs px-2 py-0">
                    {timeLeft.hours.toString().padStart(2, "0")}h
                  </Badge>
                  <span className="text-red-500">:</span>
                  <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs px-2 py-0">
                    {timeLeft.minutes.toString().padStart(2, "0")}m
                  </Badge>
                  <span className="text-red-500">:</span>
                  <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs px-2 py-0">
                    {timeLeft.seconds.toString().padStart(2, "0")}s
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Social Proof - Viewers */}
      {index === 2 &&
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-1">
            <div className="flex items-center space-x-2">
              <Users className="h-2 w-4 text-blue-600" />
              <div className="text-xs text-blue-700">
                <span className="font-semibold">{viewersCount} people</span> are viewing this cake right now
              </div>
            </div>
          </CardContent>
        </Card>
      }

      {/* Recent Orders */}
      {index === 1 &&
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-1">
            <div className="flex items-center space-x-2">
              <Clock className="h-2 w-4 text-green-600" />
              <div className="text-xs text-green-700">
                <span className="font-semibold">{viewersCount} orders</span> placed in the last hour
              </div>
            </div>
          </CardContent>
        </Card>
      }
    </div>
  )
}
