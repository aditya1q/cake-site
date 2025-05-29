"use client"

import { useEffect } from "react"
import Image from "next/image"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useRecommendations } from "@/hooks/use-recommendations"
import { useCart } from "@/hooks/use-cart"
import { useRouter } from "next/navigation"
import type { Cake } from "@/data/cakes"

interface PersonalizedRecommendationsProps {
  currentCake: Cake
  title?: string
  showRecentlyViewed?: boolean
}

export function PersonalizedRecommendations({
  currentCake,
  title = "You May Also Like",
  showRecentlyViewed = false,
}: PersonalizedRecommendationsProps) {
  const router = useRouter()
  const { addToCart } = useCart()
  const { addToRecentlyViewed, getPersonalizedRecommendations, recentlyViewed } = useRecommendations()

  useEffect(() => {
    addToRecentlyViewed(currentCake)
  }, [currentCake, addToRecentlyViewed])

  const recommendations = getPersonalizedRecommendations(currentCake.id)
  const displayCakes = showRecentlyViewed ? recentlyViewed.slice(0, 4) : recommendations.slice(0, 4)

  const handleAddToCart = (cake: Cake) => {
    addToCart({
      id: cake.id,
      name: cake.name,
      price: cake.price,
      image: cake.image,
      quantity: 1,
    })
  }

  const handleCakeClick = (cakeId: number) => {
    router.push(`/product/${cakeId}`)
  }

  if (displayCakes.length === 0) return null

  return (
    <div className="mt-8 lg:mt-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h3>
        {showRecentlyViewed && recentlyViewed.length > 4 && (
          <Button variant="ghost" size="sm" className="text-rose-600 hover:text-rose-700">
            View All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {displayCakes.map((cake) => (
          <Card
            key={cake.id}
            className="group hover:shadow-lg transition-all duration-300 border-rose-100 overflow-hidden cursor-pointer"
          >
            <CardContent className="p-0">
              <div className="relative overflow-hidden" onClick={() => handleCakeClick(cake.id)}>
                <Image
                  src={cake.image || "/placeholder.svg"}
                  alt={cake.name}
                  width={300}
                  height={200}
                  className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-2 left-2 bg-rose-500 text-white text-xs px-2 py-1">{cake.tag}</Badge>
              </div>

              <div className="p-3 space-y-2">
                <h4
                  className="font-semibold text-gray-900 group-hover:text-rose-600 transition-colors text-sm line-clamp-2 cursor-pointer"
                  onClick={() => handleCakeClick(cake.id)}
                >
                  {cake.name}
                </h4>

                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{cake.rating}</span>
                  <span className="text-xs text-gray-500">({cake.reviews})</span>
                </div>

                <div className="flex items-center space-x-1">
                  <span className="text-sm font-bold text-gray-900">₹{cake.price}</span>
                  <span className="text-xs text-gray-500 line-through">₹{cake.originalPrice}</span>
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 px-1">
                    {Math.round(((cake.originalPrice - cake.price) / cake.originalPrice) * 100)}%
                  </Badge>
                </div>

                <Button
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white h-8 text-xs"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAddToCart(cake)
                  }}
                >
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showRecentlyViewed && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">Based on your browsing history • {recentlyViewed.length} items viewed</p>
        </div>
      )}
    </div>
  )
}
