"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Filter, Star, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { useWishlist } from "@/hooks/use-wishlist"
import { allCakes, flavors, occasions } from "@/data/cakes"
import type { Cake } from "@/data/cakes"
import { AuthModal } from "@/components/auth-modal"

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const category = decodeURIComponent(params.category as string)
  const [filteredCakes, setFilteredCakes] = useState<Cake[]>([])
  const [sortBy, setSortBy] = useState("popularity")
  const [selectedFlavor, setSelectedFlavor] = useState("all")
  const [selectedOccasion, setSelectedOccasion] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const { addToCart, cartItems } = useCart()
  const { user } = useAuth()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  useEffect(() => {
    let filtered = allCakes

    // Filter by category
    if (category !== "All Cakes") {
      filtered = filtered.filter((cake) => cake.category === category)
    }

    // Filter by flavor
    if (selectedFlavor !== "all") {
      filtered = filtered.filter((cake) => cake.flavors.includes(selectedFlavor))
    }

    // Filter by occasion
    if (selectedOccasion !== "all") {
      filtered = filtered.filter((cake) => cake.occasion.includes(selectedOccasion))
    }

    // Filter by price range
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number)
      filtered = filtered.filter((cake) => cake.price >= min && cake.price <= max)
    }

    // Sort cakes
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        filtered.sort((a, b) => b.reviews - a.reviews)
    }

    setFilteredCakes(filtered)
  }, [category, selectedFlavor, selectedOccasion, priceRange, sortBy])

  const handleAddToCart = (cake: Cake) => {
    if (!user) {
      setIsAuthModalOpen(true)
      return
    }
    addToCart({
      id: cake.id,
      name: cake.name,
      price: cake.price,
      image: cake.image,
      quantity: 1,
    })
  }

  const handleWishlistToggle = (cake: Cake) => {
    if (!user) {
      setIsAuthModalOpen(true)
      return
    }

    if (isInWishlist(cake.id)) {
      removeFromWishlist(cake.id)
    } else {
      addToWishlist({
        id: cake.id,
        name: cake.name,
        price: cake.price,
        image: cake.image,
        rating: cake.rating,
        reviews: cake.reviews,
      })
    }
  }

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-rose-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span className="text-sm">Back</span>
              </Button>
              <h1 className="text-lg sm:text-xl font-bold text-rose-600">SweetDelights</h1>
            </div>
            <Button variant="ghost" size="sm" className="relative h-8 w-8 p-0" onClick={() => router.push("/cart")}>
              <ShoppingCart className="h-4 w-4" />
              {totalCartItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center bg-rose-500 text-white text-xs">
                  {totalCartItems}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{category}</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {filteredCakes.length} cake{filteredCakes.length !== 1 ? "s" : ""} available
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Filter className="h-4 w-4" />
                  <h3 className="text-base font-semibold">Filters</h3>
                </div>

                <div className="space-y-4">
                  {/* Sort By */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popularity">Popularity</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Customer Rating</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Flavor Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Flavor</label>
                    <Select value={selectedFlavor} onValueChange={setSelectedFlavor}>
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Flavors</SelectItem>
                        {flavors.map((flavor) => (
                          <SelectItem key={flavor} value={flavor}>
                            {flavor}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Occasion Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Occasion</label>
                    <Select value={selectedOccasion} onValueChange={setSelectedOccasion}>
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Occasions</SelectItem>
                        {occasions.map((occasion) => (
                          <SelectItem key={occasion} value={occasion}>
                            {occasion}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Price Range</label>
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Prices</SelectItem>
                        <SelectItem value="0-500">Under ₹500</SelectItem>
                        <SelectItem value="500-1000">₹500 - ₹1000</SelectItem>
                        <SelectItem value="1000-1500">₹1000 - ₹1500</SelectItem>
                        <SelectItem value="1500-9999">Above ₹1500</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    className="w-full h-9"
                    onClick={() => {
                      setSortBy("popularity")
                      setSelectedFlavor("all")
                      setSelectedOccasion("all")
                      setPriceRange("all")
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredCakes.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <ShoppingCart className="h-24 w-24 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No cakes found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
                <Button
                  onClick={() => {
                    setSortBy("popularity")
                    setSelectedFlavor("all")
                    setSelectedOccasion("all")
                    setPriceRange("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {filteredCakes.map((cake) => (
                  <Card
                    key={cake.id}
                    className="group hover:shadow-lg transition-all duration-300 border-rose-100 overflow-hidden"
                  >
                    <CardContent className="p-0">
                      <div
                        className="relative overflow-hidden cursor-pointer"
                        onClick={() => router.push(`/product/${cake.id}`)}
                      >
                        <Image
                          src={cake.image || "/placeholder.svg"}
                          alt={cake.name}
                          width={300}
                          height={200}
                          className="w-full h-32 sm:h-40 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-2 left-2 bg-rose-500 text-white text-xs px-2 py-1">
                          {cake.tag}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          className={`absolute top-2 right-2 bg-white/80 hover:bg-white h-7 w-7 p-0 ${
                            isInWishlist(cake.id) ? "text-red-500" : "text-gray-600"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleWishlistToggle(cake)
                          }}
                        >
                          <Heart className={`h-3 w-3 ${isInWishlist(cake.id) ? "fill-current" : ""}`} />
                        </Button>
                      </div>

                      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                        <h4
                          className="font-semibold text-gray-900 group-hover:text-rose-600 transition-colors cursor-pointer text-sm sm:text-base line-clamp-2"
                          onClick={() => router.push(`/product/${cake.id}`)}
                        >
                          {cake.name}
                        </h4>

                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs sm:text-sm font-medium ml-1">{cake.rating}</span>
                          </div>
                          <span className="text-xs text-gray-500">({cake.reviews})</span>
                        </div>

                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <span className="text-sm sm:text-lg font-bold text-gray-900">₹{cake.price}</span>
                          <span className="text-xs sm:text-sm text-gray-500 line-through">₹{cake.originalPrice}</span>
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 px-1">
                            {Math.round(((cake.originalPrice - cake.price) / cake.originalPrice) * 100)}%
                          </Badge>
                        </div>

                        <Button
                          className="w-full bg-rose-600 hover:bg-rose-700 text-white h-8 sm:h-9 text-xs sm:text-sm"
                          onClick={() => handleAddToCart(cake)}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  )
}
