"use client"

import { useState, useEffect } from "react"
import { Star, Gift, Crown, Zap, Award, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/hooks/use-auth"

interface LoyaltyData {
  currentPoints: number
  totalEarned: number
  currentTier: string
  nextTier: string
  pointsToNextTier: number
  redeemableRewards: Array<{
    id: string
    name: string
    points: number
    type: "discount" | "free_cake" | "upgrade"
    description: string
    icon: string
  }>
  recentActivity: Array<{
    id: string
    type: "earned" | "redeemed"
    points: number
    description: string
    date: string
  }>
}

const tiers = [
  {
    name: "Sweet Starter",
    min: 0,
    max: 499,
    color: "bg-gray-100 text-gray-700",
    benefits: ["1 point per ₹10", "Birthday discount"],
  },
  {
    name: "Cake Lover",
    min: 500,
    max: 1499,
    color: "bg-blue-100 text-blue-700",
    benefits: ["1.5 points per ₹10", "Free delivery", "Early access"],
  },
  {
    name: "Sweet Expert",
    min: 1500,
    max: 2999,
    color: "bg-purple-100 text-purple-700",
    benefits: ["2 points per ₹10", "Priority support", "Exclusive cakes"],
  },
  {
    name: "Cake Master",
    min: 3000,
    max: Number.POSITIVE_INFINITY,
    color: "bg-yellow-100 text-yellow-700",
    benefits: ["3 points per ₹10", "Personal baker", "VIP events"],
  },
]

export function LoyaltyProgram() {
  const { user } = useAuth()
  const [loyaltyData, setLoyaltyData] = useState<LoyaltyData>({
    currentPoints: 0,
    totalEarned: 0,
    currentTier: "Sweet Starter",
    nextTier: "Cake Lover",
    pointsToNextTier: 0,
    redeemableRewards: [],
    recentActivity: [],
  })

  useEffect(() => {
    if (user) {
      // Mock loyalty data
      const points = 1250
      const currentTier = tiers.find((tier) => points >= tier.min && points <= tier.max)
      const nextTier = tiers.find((tier) => tier.min > points)

      setLoyaltyData({
        currentPoints: points,
        totalEarned: 2100,
        currentTier: currentTier?.name || "Sweet Starter",
        nextTier: nextTier?.name || "Cake Master",
        pointsToNextTier: nextTier ? nextTier.min - points : 0,
        redeemableRewards: [
          {
            id: "1",
            name: "₹100 Off Next Order",
            points: 500,
            type: "discount",
            description: "Get ₹100 discount on orders above ₹500",
            icon: "💰",
          },
          {
            id: "2",
            name: "Free Cupcake",
            points: 300,
            type: "free_cake",
            description: "Get a free cupcake with any order",
            icon: "🧁",
          },
          {
            id: "3",
            name: "Premium Packaging",
            points: 200,
            type: "upgrade",
            description: "Upgrade to premium gift packaging",
            icon: "🎁",
          },
          {
            id: "4",
            name: "₹250 Off Next Order",
            points: 1000,
            type: "discount",
            description: "Get ₹250 discount on orders above ₹1000",
            icon: "💎",
          },
          {
            id: "5",
            name: "Free Birthday Cake",
            points: 1500,
            type: "free_cake",
            description: "Get a free 1kg birthday cake",
            icon: "🎂",
          },
        ],
        recentActivity: [
          {
            id: "1",
            type: "earned",
            points: 150,
            description: "Order #12345 - Chocolate Truffle Cake",
            date: "2024-01-15",
          },
          {
            id: "2",
            type: "redeemed",
            points: -500,
            description: "Redeemed ₹100 Off Coupon",
            date: "2024-01-10",
          },
          {
            id: "3",
            type: "earned",
            points: 200,
            description: "Order #12344 - Wedding Cake",
            date: "2024-01-08",
          },
        ],
      })
    }
  }, [user])

  const currentTierData = tiers.find((tier) => tier.name === loyaltyData.currentTier)
  const nextTierData = tiers.find((tier) => tier.name === loyaltyData.nextTier)

  const redeemReward = (rewardId: string) => {
    const reward = loyaltyData.redeemableRewards.find((r) => r.id === rewardId)
    if (reward && loyaltyData.currentPoints >= reward.points) {
      setLoyaltyData((prev) => ({
        ...prev,
        currentPoints: prev.currentPoints - reward.points,
        recentActivity: [
          {
            id: Date.now().toString(),
            type: "redeemed",
            points: -reward.points,
            description: `Redeemed ${reward.name}`,
            date: new Date().toISOString().split("T")[0],
          },
          ...prev.recentActivity,
        ],
      }))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">KyraBakers Loyalty Program</h2>
        <p className="text-gray-600">Earn points with every purchase and unlock amazing rewards!</p>
      </div>

      {/* Current Status */}
      <Card className="bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{loyaltyData.currentPoints} Points</h3>
              <p className="text-gray-600">Available to redeem</p>
            </div>
            <div className="text-right">
              <Badge className={currentTierData?.color || "bg-gray-100 text-gray-700"}>
                <Crown className="h-3 w-3 mr-1" />
                {loyaltyData.currentTier}
              </Badge>
            </div>
          </div>

          {nextTierData && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to {loyaltyData.nextTier}</span>
                <span>{loyaltyData.pointsToNextTier} points to go</span>
              </div>
              <Progress
                value={((nextTierData.min - loyaltyData.pointsToNextTier) / nextTierData.min) * 100}
                className="h-2"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tier Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-yellow-600" />
            <span>Membership Tiers</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`p-4 rounded-lg border-2 ${
                  tier.name === loyaltyData.currentTier ? "border-rose-500 bg-rose-50" : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="text-center mb-3">
                  <Badge className={tier.color}>{tier.name}</Badge>
                  <div className="text-sm text-gray-600 mt-1">
                    {tier.min} - {tier.max === Number.POSITIVE_INFINITY ? "∞" : tier.max} points
                  </div>
                </div>
                <ul className="text-xs space-y-1">
                  {tier.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Rewards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gift className="h-5 w-5 text-green-600" />
            <span>Available Rewards</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loyaltyData.redeemableRewards.map((reward) => (
              <div key={reward.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="text-center mb-3">
                  <div className="text-2xl mb-2">{reward.icon}</div>
                  <h4 className="font-semibold">{reward.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
                  <Badge variant="secondary">{reward.points} points</Badge>
                </div>
                <Button
                  className="w-full"
                  variant={loyaltyData.currentPoints >= reward.points ? "default" : "outline"}
                  disabled={loyaltyData.currentPoints < reward.points}
                  onClick={() => redeemReward(reward.id)}
                >
                  {loyaltyData.currentPoints >= reward.points ? "Redeem" : "Not enough points"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {loyaltyData.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{activity.description}</div>
                  <div className="text-sm text-gray-600">{activity.date}</div>
                </div>
                <div className={`font-medium ${activity.type === "earned" ? "text-green-600" : "text-red-600"}`}>
                  {activity.type === "earned" ? "+" : ""}
                  {activity.points} points
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* How to Earn Points */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-purple-600" />
            <span>How to Earn Points</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">1</span>
                </div>
                <div>
                  <div className="font-medium">Make a Purchase</div>
                  <div className="text-sm text-gray-600">Earn 1-3 points per ₹10 spent</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <div>
                  <div className="font-medium">Write Reviews</div>
                  <div className="text-sm text-gray-600">Get 50 points per review</div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <div>
                  <div className="font-medium">Refer Friends</div>
                  <div className="text-sm text-gray-600">Earn 100 points per referral</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold">4</span>
                </div>
                <div>
                  <div className="font-medium">Birthday Bonus</div>
                  <div className="text-sm text-gray-600">Get 200 points on your birthday</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
