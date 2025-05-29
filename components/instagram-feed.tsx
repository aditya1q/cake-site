"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface InstagramPost {
  id: string
  imageUrl: string
  caption: string
  likes: number
  comments: number
  timestamp: string
  permalink: string
  type: "image" | "video" | "carousel"
}

// Mock Instagram data - In production, you'd fetch from Instagram Basic Display API
const mockInstagramPosts: InstagramPost[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop",
    caption: "Fresh chocolate cake with strawberry decoration! 🍰✨ #handmade #chocolatecake",
    likes: 234,
    comments: 18,
    timestamp: "2024-01-15T10:30:00Z",
    permalink: "https://instagram.com/p/example1",
    type: "image",
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=400&fit=crop",
    caption: "Behind the scenes: Our master baker creating magic! 👨‍🍳 #behindthescenes #bakingprocess",
    likes: 189,
    comments: 12,
    timestamp: "2024-01-14T15:45:00Z",
    permalink: "https://instagram.com/p/example2",
    type: "video",
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400&h=400&fit=crop",
    caption: "Wedding cake perfection! Three tiers of pure elegance 💍 #weddingcake #elegant",
    likes: 456,
    comments: 32,
    timestamp: "2024-01-13T09:20:00Z",
    permalink: "https://instagram.com/p/example3",
    type: "image",
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    caption: "Birthday surprise delivery! The joy on their face was priceless 🎂🎉 #birthdaycake #delivery",
    likes: 312,
    comments: 24,
    timestamp: "2024-01-12T14:10:00Z",
    permalink: "https://instagram.com/p/example4",
    type: "carousel",
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=400&fit=crop",
    caption: "Fresh ingredients make all the difference! 🥚🧈 #freshingredients #quality",
    likes: 167,
    comments: 8,
    timestamp: "2024-01-11T11:30:00Z",
    permalink: "https://instagram.com/p/example5",
    type: "image",
  },
  {
    id: "6",
    imageUrl: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=400&fit=crop",
    caption: "Custom theme cake for little princess! 👑🎀 #customcake #themecake #princess",
    likes: 398,
    comments: 28,
    timestamp: "2024-01-10T16:45:00Z",
    permalink: "https://instagram.com/p/example6",
    type: "image",
  },
]

interface InstagramFeedProps {
  maxPosts?: number
  showHeader?: boolean
  className?: string
}

export function InstagramFeed({ maxPosts = 6, showHeader = true, className = "" }: InstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to Instagram
    const fetchInstagramPosts = async () => {
      setLoading(true)
      // In production, you'd call Instagram Basic Display API here
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setPosts(mockInstagramPosts.slice(0, maxPosts))
      setLoading(false)
    }

    fetchInstagramPosts()
  }, [maxPosts])

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const postTime = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - postTime.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        {showHeader && (
          <div className="text-center space-y-2">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: maxPosts }).map((_, index) => (
            <div key={index} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {showHeader && (
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full">
              <Instagram className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Follow Our Sweet Journey</h3>
              <p className="text-gray-600">See our latest creations and behind-the-scenes moments</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-pink-300 text-pink-600 hover:bg-pink-50"
            onClick={() => window.open("https://instagram.com/KyraBakers", "_blank")}
          >
            <Instagram className="h-4 w-4 mr-2" />
            Follow @KyraBakers
          </Button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={post.imageUrl || "/placeholder.svg"}
                  alt={post.caption}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Post type indicator */}
                {post.type === "video" && (
                  <Badge className="absolute top-2 right-2 bg-black/70 text-white">Video</Badge>
                )}
                {post.type === "carousel" && (
                  <Badge className="absolute top-2 right-2 bg-black/70 text-white">Carousel</Badge>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center space-y-2">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-5 w-5" />
                        <span className="font-semibold">{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-5 w-5" />
                        <span className="font-semibold">{post.comments}</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                      onClick={() => window.open(post.permalink, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View on Instagram
                    </Button>
                  </div>
                </div>
              </div>

              <CardContent className="p-3">
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">{post.caption}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{formatTimeAgo(post.timestamp)}</span>
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>{post.likes}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{post.comments}</span>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Button
          variant="outline"
          className="border-pink-300 text-pink-600 hover:bg-pink-50"
          onClick={() => window.open("https://instagram.com/KyraBakers", "_blank")}
        >
          View More on Instagram
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
