"use client"

import { useState, useEffect } from "react"
import { Share2, Copy, Gift, Users, Trophy, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/hooks/use-auth"

interface ReferralData {
  referralCode: string
  totalReferrals: number
  pendingRewards: number
  totalEarned: number
  referralHistory: Array<{
    id: string
    friendName: string
    date: string
    status: "pending" | "completed"
    reward: number
  }>
}

export function ReferralSystem() {
  const { user } = useAuth()
  const [referralData, setReferralData] = useState<ReferralData>({
    referralCode: "",
    totalReferrals: 0,
    pendingRewards: 0,
    totalEarned: 0,
    referralHistory: [],
  })
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (user) {
      // Generate referral code based on user ID
      const code = `SWEET${user.id.slice(-6).toUpperCase()}`
      setReferralData({
        referralCode: code,
        totalReferrals: 12,
        pendingRewards: 300,
        totalEarned: 1200,
        referralHistory: [
          {
            id: "1",
            friendName: "Priya Sharma",
            date: "2024-01-15",
            status: "completed",
            reward: 100,
          },
          {
            id: "2",
            friendName: "Rajesh Kumar",
            date: "2024-01-10",
            status: "pending",
            reward: 100,
          },
          {
            id: "3",
            friendName: "Anita Patel",
            date: "2024-01-08",
            status: "completed",
            reward: 100,
          },
        ],
      })
    }
  }, [user])

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralData.referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareReferral = () => {
    const shareText = `🎂 Join SweetDelights and get ₹100 off your first order! Use my referral code: ${referralData.referralCode}\n\nOrder fresh, handcrafted cakes with same-day delivery! 🚚✨`

    if (navigator.share) {
      navigator.share({
        title: "SweetDelights Referral",
        text: shareText,
        url: `https://sweetdelights.com?ref=${referralData.referralCode}`,
      })
    } else {
      navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const referralUrl = `https://sweetdelights.com?ref=${referralData.referralCode}`

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Refer Friends & Earn ₹100</h2>
        <p className="text-gray-600">Both you and your friend get ₹100 when they make their first purchase!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-rose-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-rose-600">{referralData.totalReferrals}</div>
            <div className="text-sm text-gray-600">Total Referrals</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4 text-center">
            <Gift className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">₹{referralData.totalEarned}</div>
            <div className="text-sm text-gray-600">Total Earned</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">₹{referralData.pendingRewards}</div>
            <div className="text-sm text-gray-600">Pending Rewards</div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Code Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Share2 className="h-5 w-5 text-rose-600" />
            <span>Your Referral Code</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input value={referralData.referralCode} readOnly className="font-mono text-lg text-center bg-gray-50" />
            <Button onClick={copyReferralCode} variant="outline">
              <Copy className="h-4 w-4 mr-2" />
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>

          <div className="flex space-x-2">
            <Input value={referralUrl} readOnly className="text-sm bg-gray-50" placeholder="Referral URL" />
            <Button onClick={shareReferral} className="bg-rose-600 hover:bg-rose-700">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">How it works:</h4>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. Share your referral code with friends</li>
              <li>2. They sign up and use your code</li>
              <li>3. They get ₹100 off their first order</li>
              <li>4. You get ₹100 credit when they purchase</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Progress to Next Milestone */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-600" />
            <span>Next Milestone</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Progress to 15 referrals</span>
              <span>{referralData.totalReferrals}/15</span>
            </div>
            <Progress value={(referralData.totalReferrals / 15) * 100} className="h-2" />
            <div className="text-sm text-gray-600">Refer 3 more friends to unlock a ₹500 bonus reward!</div>
          </div>
        </CardContent>
      </Card>

      {/* Referral History */}
      <Card>
        <CardHeader>
          <CardTitle>Referral History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {referralData.referralHistory.map((referral) => (
              <div key={referral.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{referral.friendName}</div>
                  <div className="text-sm text-gray-600">{referral.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-green-600">+₹{referral.reward}</div>
                  <Badge
                    variant={referral.status === "completed" ? "default" : "secondary"}
                    className={referral.status === "completed" ? "bg-green-100 text-green-700" : ""}
                  >
                    {referral.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
