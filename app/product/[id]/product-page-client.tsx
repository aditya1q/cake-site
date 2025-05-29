"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {Star,Heart,ShoppingCart,Minus,Plus,ArrowLeft,Truck,Shield,Award,Users,CheckCircle,MessageCircle,Share2,Camera,ChevronDown,ChevronUp,Gift,Zap,Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useCart } from "@/hooks/use-cart"
import { UrgencyScarcity } from "@/components/urgency-scarcity"
import { PersonalizedRecommendations } from "@/components/personalized-recommendations"
import { CakeCustomizationForm } from "@/components/cake-customization-form"
import { AdvancedImageGallery } from "@/components/advanced-image-gallery"
import { DeliveryDateTimePicker } from "@/components/delivery-date-time-picker"

interface ProductPageClientProps {
  product: any
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const router = useRouter()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedWeight, setSelectedWeight] = useState("1kg")
  const [showCustomization, setShowCustomization] = useState(false)
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState<Date | null>(null)
  const [selectedDeliverySlot, setSelectedDeliverySlot] = useState<any>(null)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Flash deal end time (6 hours from now for urgency)
  const flashDealEndTime = new Date(Date.now() + 6 * 60 * 60 * 1000)

  // Enhanced product data with more professional content
  const enhancedProduct = {
    ...product,
    images: [
      product.image,
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=800&fit=crop&crop=center",
    ],
    stockLeft: Math.floor(Math.random() * 8) + 2,
    ingredients: [
      "Premium Belgian Dark Chocolate",
      "Fresh Cream",
      "Cocoa Powder",
      "Butter",
      "Free-range Eggs",
      "Vanilla Extract",
    ],
    nutritionalInfo: {
      calories: "320 per slice",
      fat: "18g",
      carbs: "35g",
      protein: "6g",
    },
    features: [
      { icon: Shield, text: "100% Fresh & Hygienic", color: "text-green-600" },
      { icon: Award, text: "Premium Quality Ingredients", color: "text-blue-600" },
      { icon: Truck, text: "Same Day Delivery", color: "text-purple-600" },
      { icon: Users, text: "Handcrafted by Expert Bakers", color: "text-orange-600" },
    ],
    trustBadges: [
      { text: "100% Eggless Available", icon: "🥚", color: "bg-green-50 text-green-700 border-green-200" },
      { text: "Hygienic Kitchen", icon: "🧼", color: "bg-blue-50 text-blue-700 border-blue-200" },
      { text: "Same-Day Delivery", icon: "🚚", color: "bg-purple-50 text-purple-700 border-purple-200" },
      { text: "Fresh Ingredients", icon: "🌿", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    ],
  }

  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      date: "2024-01-15",
      comment:
        "Absolutely delicious! The chocolate was rich and the cake was perfectly moist. Ordered for my husband's birthday and everyone loved it. The presentation was beautiful too!",
      verified: true,
      helpful: 12,
      images: [
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&h=200&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200&h=200&fit=crop&crop=center",
      ],
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      rating: 4,
      date: "2024-01-10",
      comment:
        "Great taste and quality. Delivery was on time. The presentation was beautiful. Will definitely order again. The chocolate ganache was perfect!",
      verified: true,
      helpful: 8,
      images: [],
    },
    {
      id: 3,
      name: "Anita Patel",
      rating: 5,
      date: "2024-01-08",
      comment:
        "Best chocolate cake I've ever had! The truffle filling was heavenly. Perfect for special occasions. Highly recommended!",
      verified: true,
      helpful: 15,
      images: ["https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=200&h=200&fit=crop&crop=center"],
    },
  ]

  const ratingBreakdown = [
    { stars: 5, count: 156, percentage: 64 },
    { stars: 4, count: 67, percentage: 27 },
    { stars: 3, count: 15, percentage: 6 },
    { stars: 2, count: 5, percentage: 2 },
    { stars: 1, count: 2, percentage: 1 },
  ]

  const selectedWeightOption = enhancedProduct.weightOptions?.find((option) => option.weight === selectedWeight)
  const currentPrice = selectedWeightOption?.price || enhancedProduct.price

  const handleAddToCart = () => {
    addToCart({
      id: enhancedProduct.id,
      name: `${enhancedProduct.name} (${selectedWeight})`,
      price: currentPrice,
      image: enhancedProduct.images[0],
      quantity: quantity,
    })
  }

  const handleBuyNow = () => {
    handleAddToCart()
    router.push("/cart")
  }

  const handleCustomizeAndAdd = (customization: any) => {
    addToCart({
      id: enhancedProduct.id,
      name: `${enhancedProduct.name} (${selectedWeight}) - Customized`,
      price: currentPrice + (customization.photoUpload ? 200 : 0),
      image: enhancedProduct.images[0],
      quantity: quantity,
      customization,
    })
    setShowCustomization(false)
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <header className="bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="h-10 px-3 hover:bg-gray-100 rounded-full"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  SweetDelights
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full hover:bg-gray-100">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 rounded-full hover:bg-gray-100"
                onClick={() => router.push("/cart")}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images - Enhanced for Mobile */}
          <div className="space-y-4">
            <AdvancedImageGallery
              images={enhancedProduct.images}
              productName={enhancedProduct.name}
              tag={enhancedProduct.tag}
              stockLeft={enhancedProduct.stockLeft}
            />
          </div>

          {/* Product Details - Redesigned */}
          <div className="space-y-6">
            {/* Product Header */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white border-0">
                    {enhancedProduct.tag}
                  </Badge>
                  {enhancedProduct.stockLeft <= 5 && (
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 animate-pulse">
                      Only {enhancedProduct.stockLeft} left!
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-10 w-10 p-0 rounded-full ${
                    isWishlisted ? "text-red-500 bg-red-50" : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                  }`}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                {enhancedProduct.name}
              </h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(enhancedProduct.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-900">{enhancedProduct.rating}</span>
                  <span className="text-gray-500">({enhancedProduct.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-1 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">In Stock</span>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">{enhancedProduct.description}</p>

              {/* Price Section */}
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-gray-900">₹{currentPrice}</span>
                  <span className="text-xl text-gray-500 line-through">₹{enhancedProduct.originalPrice}</span>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    {Math.round(((enhancedProduct.originalPrice - currentPrice) / enhancedProduct.originalPrice) * 100)}
                    % OFF
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">Inclusive of all taxes • Free delivery above ₹500</p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-600" />
                Why Choose Us
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {enhancedProduct.trustBadges.map((badge, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-2 text-sm px-3 py-2 rounded-lg border ${badge.color}`}
                  >
                    <span className="text-lg">{badge.icon}</span>
                    <span className="font-medium">{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weight Selection */}
            {enhancedProduct.weightOptions && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">Select Weight</h3>
                <div className="grid grid-cols-2 gap-3">
                  {enhancedProduct.weightOptions.map((option) => (
                    <Card
                      key={option.weight}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedWeight === option.weight
                          ? "border-rose-500 bg-rose-50 shadow-md"
                          : "border-gray-200 hover:border-rose-300"
                      }`}
                      onClick={() => setSelectedWeight(option.weight)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="font-bold text-lg text-gray-900">{option.weight}</div>
                        <div className="text-sm text-gray-600 mb-1">{option.serves}</div>
                        <div className="font-bold text-rose-600">₹{option.price}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <span className="font-semibold text-gray-900">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="h-10 w-10 p-0 hover:bg-gray-100"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-10 w-10 p-0 hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Total</div>
                  <div className="text-xl font-bold text-gray-900">₹{currentPrice * quantity}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white h-12 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={handleBuyNow}
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Buy Now - ₹{currentPrice * quantity}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-rose-300 text-rose-600 hover:bg-rose-50 h-12 rounded-xl font-semibold"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-2 border-purple-300 text-purple-600 hover:bg-purple-50 h-12 rounded-xl font-semibold"
                  onClick={() => setShowCustomization(true)}
                >
                  <Gift className="h-5 w-5 mr-2" />🎨 Customize Your Cake
                </Button>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Need Help?</h3>
                  <p className="text-sm text-blue-700">Chat with our cake experts</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Chat
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-300 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                </div>
              </div>
            </div>

            {/* Urgency & Scarcity */}
            <UrgencyScarcity
              stockLeft={enhancedProduct.stockLeft}
              isFlashDeal={enhancedProduct.id === 1}
              flashDealEndTime={flashDealEndTime}
              viewersCount={Math.floor(Math.random() * 20) + 5}
            />
          </div>
        </div>

        {/* Mobile-Optimized Expandable Sections */}
        <div className="mt-8 space-y-4 lg:hidden">
          {/* Delivery Options */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              className="w-full p-4 flex items-center justify-between text-left"
              onClick={() => toggleSection("delivery")}
            >
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-gray-900">Delivery Options</span>
              </div>
              {expandedSection === "delivery" ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {expandedSection === "delivery" && (
              <div className="px-4 pb-4">
                <DeliveryDateTimePicker
                  onSelectionChange={(date, slot) => {
                    setSelectedDeliveryDate(date)
                    setSelectedDeliverySlot(slot)
                  }}
                  selectedDate={selectedDeliveryDate}
                  selectedSlot={selectedDeliverySlot}
                />
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              className="w-full p-4 flex items-center justify-between text-left"
              onClick={() => toggleSection("details")}
            >
              <div className="flex items-center space-x-3">
                <Award className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-gray-900">Product Details</span>
              </div>
              {expandedSection === "details" ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {expandedSection === "details" && (
              <div className="px-4 pb-4 space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Ingredients</h4>
                  <div className="flex flex-wrap gap-2">
                    {enhancedProduct.ingredients.map((ingredient, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Perfect For</h4>
                  <div className="flex flex-wrap gap-2">
                    {enhancedProduct.occasion.map((occasion) => (
                      <Badge key={occasion} className="bg-rose-100 text-rose-700">
                        {occasion}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              className="w-full p-4 flex items-center justify-between text-left"
              onClick={() => toggleSection("reviews")}
            >
              <div className="flex items-center space-x-3">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold text-gray-900">Reviews ({enhancedProduct.reviews})</span>
              </div>
              {expandedSection === "reviews" ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {expandedSection === "reviews" && (
              <div className="px-4 pb-4">
                <div className="space-y-4">
                  {reviews.slice(0, 2).map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-rose-100 text-rose-600 text-sm">
                            {review.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-sm">{review.name}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Tabs */}
        <div className="mt-12 hidden lg:block">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-14 bg-white rounded-xl shadow-sm border border-gray-100">
              <TabsTrigger value="description" className="text-sm font-medium rounded-lg">
                Description
              </TabsTrigger>
              <TabsTrigger value="ingredients" className="text-sm font-medium rounded-lg">
                Ingredients
              </TabsTrigger>
              <TabsTrigger value="delivery" className="text-sm font-medium rounded-lg">
                Delivery
              </TabsTrigger>
              <TabsTrigger value="reviews" className="text-sm font-medium rounded-lg">
                Reviews ({enhancedProduct.reviews})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">About This Cake</h3>
                  <div className="space-y-6">
                    <p className="text-gray-600 leading-relaxed text-lg">{enhancedProduct.description}</p>
                    <p className="text-gray-600 leading-relaxed">
                      Our expert bakers use only the finest ingredients to create this masterpiece. Each cake is freshly
                      baked to order and decorated with precision to ensure you receive the perfect cake for your
                      special occasion.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                      <div>
                        <h4 className="font-bold text-lg mb-4">Why Choose Our Cakes?</h4>
                        <ul className="space-y-3">
                          {enhancedProduct.features.map((feature, index) => (
                            <li key={index} className="flex items-center space-x-3">
                              <feature.icon className={`h-5 w-5 ${feature.color}`} />
                              <span className="text-gray-700">{feature.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-lg mb-4">Perfect For</h4>
                        <div className="flex flex-wrap gap-2">
                          {enhancedProduct.occasion.map((occasion) => (
                            <Badge key={occasion} className="bg-rose-100 text-rose-700 px-3 py-1">
                              {occasion}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ingredients" className="mt-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Premium Ingredients</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-lg mb-4">Main Ingredients</h4>
                      <ul className="space-y-3">
                        {enhancedProduct.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                            <span className="text-gray-700">{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-lg mb-4">Quality Assurance</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Shield className="h-5 w-5 text-green-500" />
                          <span className="text-gray-700">ISO 22000 Certified Kitchen</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Award className="h-5 w-5 text-green-500" />
                          <span className="text-gray-700">Premium Grade Ingredients</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-gray-700">No Artificial Preservatives</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="delivery" className="mt-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <DeliveryDateTimePicker
                    onSelectionChange={(date, slot) => {
                      setSelectedDeliveryDate(date)
                      setSelectedDeliverySlot(slot)
                    }}
                    selectedDate={selectedDeliveryDate}
                    selectedSlot={selectedDeliverySlot}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Rating Summary */}
                    <div className="lg:col-span-1">
                      <div className="text-center mb-6">
                        <div className="text-5xl font-bold text-gray-900 mb-2">{enhancedProduct.rating}</div>
                        <div className="flex items-center justify-center space-x-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-6 w-6 ${
                                i < Math.floor(enhancedProduct.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-gray-600">{enhancedProduct.reviews} reviews</div>
                      </div>

                      <div className="space-y-3">
                        {ratingBreakdown.map((rating) => (
                          <div key={rating.stars} className="flex items-center space-x-3">
                            <span className="w-8 text-sm">{rating.stars}★</span>
                            <Progress value={rating.percentage} className="flex-1 h-3" />
                            <span className="w-8 text-sm text-gray-600">{rating.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Reviews List */}
                    <div className="lg:col-span-2">
                      <div className="space-y-6">
                        {reviews.map((review) => (
                          <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                            <div className="flex items-start space-x-4">
                              <Avatar className="w-12 h-12">
                                <AvatarFallback className="bg-rose-100 text-rose-600 font-semibold">
                                  {review.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>

                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="font-semibold text-gray-900">{review.name}</span>
                                  {review.verified && (
                                    <Badge className="bg-green-100 text-green-700 text-xs">Verified Purchase</Badge>
                                  )}
                                </div>

                                <div className="flex items-center space-x-2 mb-3">
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-gray-500">{review.date}</span>
                                </div>

                                <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>

                                {review.images.length > 0 && (
                                  <div className="flex space-x-2 mb-4">
                                    {review.images.map((image, index) => (
                                      <div key={index} className="relative">
                                        <Image
                                          src={image || "/placeholder.svg"}
                                          alt={`Review image ${index + 1}`}
                                          width={80}
                                          height={80}
                                          className="rounded-lg object-cover"
                                        />
                                        <Camera className="absolute top-1 right-1 h-3 w-3 text-white bg-black/50 rounded-full p-0.5" />
                                      </div>
                                    ))}
                                  </div>
                                )}

                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <button className="hover:text-gray-700 flex items-center space-x-1">
                                    <span>👍</span>
                                    <span>Helpful ({review.helpful})</span>
                                  </button>
                                  <button className="hover:text-gray-700">Reply</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Personalized Recommendations */}
        <div className="mt-12">
          <PersonalizedRecommendations currentCake={enhancedProduct} />
        </div>
      </div>

      {/* Enhanced Sticky Mobile Footer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 shadow-lg">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm text-gray-600">Total Price</div>
              <div className="text-xl font-bold text-gray-900">₹{currentPrice * quantity}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Quantity: {quantity}</div>
              <div className="text-sm text-green-600 font-medium">✓ In Stock</div>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button
              size="lg"
              className="flex-1 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white h-12 rounded-xl font-semibold shadow-lg"
              onClick={handleBuyNow}
            >
              <Zap className="h-4 w-4 mr-2" />
              Buy Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-rose-300 text-rose-600 hover:bg-rose-50 h-12 w-12 p-0 rounded-xl"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={`border-2 h-12 w-12 p-0 rounded-xl ${
                isWishlisted
                  ? "border-red-300 text-red-600 bg-red-50"
                  : "border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Cake Customization Modal */}
      {showCustomization && (
        <CakeCustomizationForm
          isOpen={showCustomization}
          onClose={() => setShowCustomization(false)}
          onSubmit={handleCustomizeAndAdd}
          cakeName={enhancedProduct.name}
          basePrice={currentPrice}
        />
      )}
    </div>
  )
}
