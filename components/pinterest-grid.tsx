"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Heart, ShoppingCart, ExternalLink, Share2, Star, Clock, Users } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useWishlist } from "@/hooks/use-wishlist"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"

interface PinterestItem {
  id: number
  image: string
  title: string
  description?: string
  price: number
  originalPrice?: number
  discount?: number
  category: string
  tags?: string[]
  height?: "short" | "medium" | "tall"
  rating?: number
  reviews?: number
  prepTime?: string
  serves?: string
  difficulty?: "Easy" | "Medium" | "Hard"
  isNew?: boolean
  isTrending?: boolean
}

interface PinterestGridProps {
  items: PinterestItem[]
  columns?: number
  gap?: number
  className?: string
  showActions?: boolean
}

export function PinterestGrid({
  items,
  columns = 4,
  gap = 20,
  className = "",
  showActions = true,
}: PinterestGridProps) {
  const router = useRouter()
  const { user } = useAuth()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const [columnItems, setColumnItems] = useState<PinterestItem[][]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())

  // Responsive columns
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Distribute items into columns with masonry layout
  useEffect(() => {
    const cols = isMobile ? 2 : columns
    const newColumnItems: PinterestItem[][] = Array.from({ length: cols }, () => [])
    const columnHeights = Array(cols).fill(0)

    items.forEach((item) => {
      // Find the shortest column
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))
      newColumnItems[shortestColumnIndex].push(item)

      // Estimate height based on item properties
      const baseHeight = item.height === "short" ? 300 : item.height === "tall" ? 500 : 400
      const extraHeight = item.description ? 60 : 0
      columnHeights[shortestColumnIndex] += baseHeight + extraHeight + gap
    })

    setColumnItems(newColumnItems)
  }, [items, columns, isMobile, gap])

  const handleItemClick = (id: number) => {
    router.push(`/product/${id}`)
  }

  const handleWishlistToggle = (e: React.MouseEvent, item: PinterestItem) => {
    e.stopPropagation()

    if (!user) {
      return
    }

    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id)
    } else {
      addToWishlist({
        id: item.id,
        name: item.title,
        price: item.price,
        image: item.image,
        rating: item.rating || 4.5,
        reviews: item.reviews || 10,
      })
    }
  }

  const handleAddToCart = (e: React.MouseEvent, item: PinterestItem) => {
    e.stopPropagation()

    addToCart({
      id: item.id,
      name: item.title,
      price: item.price,
      image: item.image,
      quantity: 1,
    })
  }

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => new Set([...prev, id]))
  }

  // Enhanced height classes with better proportions
  const getHeightClass = (height?: "short" | "medium" | "tall") => {
    switch (height) {
      case "short":
        return "h-72 sm:h-80"
      case "tall":
        return "h-96 sm:h-[28rem]"
      case "medium":
      default:
        return "h-80 sm:h-96"
    }
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="flex gap-5" style={{ gap: `${gap}px` }}>
        {columnItems.map((column, columnIndex) => (
          <div key={columnIndex} className="flex-1 flex flex-col gap-5" style={{ gap: `${gap}px` }}>
            {column.map((item, itemIndex) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: columnIndex * 0.1 + itemIndex * 0.05,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group bg-white"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => handleItemClick(item.id)}
                whileHover={{ y: -8 }}
              >
                <div className={`relative ${getHeightClass(item.height)} overflow-hidden`}>
                  {/* Loading skeleton */}
                  {!loadedImages.has(item.id) && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
                  )}

                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className={`object-cover transition-all duration-700 ease-out group-hover:scale-110 ${
                      loadedImages.has(item.id) ? "opacity-100" : "opacity-0"
                    }`}
                    sizes="(max-width: 768px) 50vw, 25vw"
                    onLoad={() => handleImageLoad(item.id)}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <Badge className="bg-white/90 text-rose-600 backdrop-blur-sm font-medium shadow-sm">
                      {item.category}
                    </Badge>
                    {item.isNew && <Badge className="bg-green-500 text-white font-medium shadow-sm">New</Badge>}
                    {item.isTrending && (
                      <Badge className="bg-orange-500 text-white font-medium shadow-sm">Trending</Badge>
                    )}
                  </div>

                  {/* Top right actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/90 hover:bg-white h-9 w-9 rounded-full p-0 shadow-lg backdrop-blur-sm"
                        onClick={(e) => handleWishlistToggle(e, item)}
                      >
                        <Heart
                          className={`h-4 w-4 transition-colors ${
                            isInWishlist(item.id) ? "fill-rose-500 text-rose-500" : "text-gray-700"
                          }`}
                        />
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/90 hover:bg-white h-9 w-9 rounded-full p-0 shadow-lg backdrop-blur-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Share2 className="h-4 w-4 text-gray-700" />
                      </Button>
                    </motion.div>
                  </div>

                  {/* Price tag */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                      )}
                    </div>
                    {item.discount && (
                      <Badge className="mt-1 bg-green-100 text-green-700 text-xs font-medium">
                        {item.discount}% OFF
                      </Badge>
                    )}
                  </div>

                  {/* Hover overlay with enhanced actions */}
                  <AnimatePresence>
                    {hoveredItem === item.id && showActions && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col justify-center items-center p-4"
                      >
                        <div className="space-y-3 w-full max-w-xs">
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            <Button
                              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-3 rounded-xl shadow-lg"
                              onClick={(e) => handleAddToCart(e, item)}
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add to Cart
                            </Button>
                          </motion.div>
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.15 }}
                          >
                            <Button
                              variant="secondary"
                              className="w-full bg-white/95 hover:bg-white text-gray-900 font-medium py-3 rounded-xl shadow-lg"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleItemClick(item.id)
                              }}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Enhanced item details */}
                <motion.div
                  className="p-4 bg-white"
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-semibold text-gray-900 line-clamp-2 text-lg mb-2">{item.title}</h3>

                  {item.description && <p className="text-sm text-gray-600 line-clamp-2 mb-3">{item.description}</p>}

                  {/* Rating and reviews */}
                  {item.rating && (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(item.rating!) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{item.rating}</span>
                      {item.reviews && <span className="text-sm text-gray-500">({item.reviews} reviews)</span>}
                    </div>
                  )}

                  {/* Additional info */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    {item.prepTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{item.prepTime}</span>
                      </div>
                    )}
                    {item.serves && (
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{item.serves}</span>
                      </div>
                    )}
                    {item.difficulty && (
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          item.difficulty === "Easy"
                            ? "border-green-300 text-green-700"
                            : item.difficulty === "Medium"
                              ? "border-yellow-300 text-yellow-700"
                              : "border-red-300 text-red-700"
                        }`}
                      >
                        {item.difficulty}
                      </Badge>
                    )}
                  </div>

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200">
                          {tag}
                        </Badge>
                      ))}
                      {item.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs bg-gray-50 text-gray-500 border-gray-200">
                          +{item.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
