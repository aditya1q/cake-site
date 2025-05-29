"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Heart, ShoppingCart, Star, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useWishlist } from "@/hooks/use-wishlist"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"

export default function WishlistPage() {
  const router = useRouter()
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { user } = useAuth()

  if (!user) {
    router.push("/")
    return null
  }

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    })
  }

  const handleMoveToCart = (item: any) => {
    handleAddToCart(item)
    removeFromWishlist(item.id)
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-rose-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
                <h1 className="text-xl font-bold text-rose-600">My Wishlist</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Save your favorite cakes for later!</p>
            <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white" onClick={() => router.push("/")}>
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
              <h1 className="text-xl font-bold text-rose-600">My Wishlist ({wishlistItems.length})</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-shadow duration-300 border-rose-100">
              <CardContent className="p-0">
                <div
                  className="relative overflow-hidden rounded-t-lg cursor-pointer"
                  onClick={() => router.push(`/product/${item.id}`)}
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white text-red-500"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFromWishlist(item.id)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="p-4 space-y-3">
                  <h4
                    className="font-semibold text-gray-900 group-hover:text-rose-600 transition-colors cursor-pointer"
                    onClick={() => router.push(`/product/${item.id}`)}
                  >
                    {item.name}
                  </h4>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium ml-1">{item.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({item.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      className="flex-1 bg-rose-600 hover:bg-rose-700 text-white"
                      onClick={() => handleMoveToCart(item)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Move to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
