"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Search, MapPin, ShoppingCart, User, Heart, Star, ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { useWishlist } from "@/hooks/use-wishlist"
import { useRouter } from "next/navigation"
import { AuthModal } from "@/components/auth-modal"
import { SearchModal } from "@/components/search-modal"
import { WhyChooseUs } from "@/components/why-choose-us"
import { TestimonialsSlider } from "@/components/testimonials-slider"
import { UrgencyScarcity } from "@/components/urgency-scarcity"
import { allCakes, categories } from "@/data/cakes"
import { ExitIntentPopup } from "@/components/exit-intent-popup"
// import { NewsletterSubscription } from "@/components/newsletter-subscription"
import { InstagramFeed } from "@/components/instagram-feed"
import { DiscountCountdownPopup, useDiscountPopup } from "@/components/discount-countdown-popup"
import { WelcomeBanner } from "@/components/welcome-banner"

export default function CakeBakeryHomepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All Cakes")
  const { addToCart, cartItems } = useCart()
  const { user, setLoading } = useAuth()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const router = useRouter()

  const featuredCakes = allCakes.slice(0, 8)
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  // Flash deal end time (24 hours from now)
  const flashDealEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000)

  const [isExitIntentOpen, setIsExitIntentOpen] = useState(false)
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false)
  const [showNewsletterBanner, setShowNewsletterBanner] = useState(true)
  const { isOpen: isDiscountPopupOpen, closePopup: closeDiscountPopup, claimDiscount } = useDiscountPopup()

  useEffect(() => {
    // Initialize auth state
    setLoading(false)
  }, [setLoading])

  useEffect(() => {
    let exitIntentShown = false

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentShown && !localStorage.getItem("exit-intent-dismissed")) {
        setIsExitIntentOpen(true)
        exitIntentShown = true
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    return () => document.removeEventListener("mouseleave", handleMouseLeave)
  }, [])

  const handleAddToCart = (cake: any) => {
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

  const handleWishlistToggle = (cake: any) => {
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

  const handleProductClick = (cakeId: number) => {
    router.push(`/product/${cakeId}`)
  }

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)
    router.push(`/category/${encodeURIComponent(category)}`)
  }

  const handleLoginClick = () => {
    if (user) {
      router.push("/profile")
    } else {
      setIsAuthModalOpen(true)
    }
  }

  const handleSearchClick = () => {
    setIsSearchModalOpen(true)
  }

  const handleNewsletterSubscribe = (email: string) => {
    console.log("Newsletter subscription:", email)
    // Integrate with Mailchimp/ConvertKit here
  }

  const handleExitIntentSubscribe = (email: string) => {
    console.log("Exit intent subscription:", email)
    localStorage.setItem("exit-intent-dismissed", "true")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <WelcomeBanner />

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-rose-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => router.push("/")}>
              <h1 className="text-xl sm:text-2xl font-bold text-rose-600">KyraBakers</h1>
            </div>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search cakes..."
                  className="pl-10 pr-4 py-2 w-full border-rose-200 focus:border-rose-400 focus:ring-rose-400 cursor-pointer h-9"
                  onClick={handleSearchClick}
                  readOnly
                />
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>Mumbai</span>
                <ChevronDown className="h-3 w-3" />
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex items-center space-x-1 h-8 px-2"
                onClick={handleLoginClick}
              >
                <User className="h-4 w-4" />
                <span className="text-sm">{user ? user.email?.split("@")[0] : "Login"}</span>
              </Button>

              {user && (
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => router.push("/wishlist")}>
                  <Heart className="h-4 w-4" />
                </Button>
              )}

              <Button variant="ghost" size="sm" className="relative h-8 w-8 p-0" onClick={() => router.push("/cart")}>
                <ShoppingCart className="h-4 w-4" />
                {totalCartItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center bg-rose-500 text-white text-xs">
                    {totalCartItems}
                  </Badge>
                )}
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden h-8 w-8 p-0"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-3 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search cakes..."
              className="pl-10 pr-4 py-2 w-full border-rose-200 focus:border-rose-400 cursor-pointer h-9"
              onClick={handleSearchClick}
              readOnly
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-rose-100">
            <div className="px-3 py-2 space-y-1">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="ghost"
                  className="w-full justify-start text-left h-8 px-2"
                  onClick={() => handleCategoryClick(category)}
                >
                  <span className="text-sm">{category}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* <NewsletterSubscription
        variant="banner"
        isOpen={showNewsletterBanner}
        onClose={() => setShowNewsletterBanner(false)}
      /> */}

      {/* Navigation */}
      <nav className="hidden md:block bg-white/95 backdrop-blur-md border-b border-rose-100 sticky top-14 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-6 py-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant="ghost"
                className={`text-gray-700 hover:text-rose-600 hover:bg-rose-50 font-medium h-8 px-3 text-sm transition-colors ${activeCategory === category ? "text-rose-600 bg-rose-50" : ""
                  }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
                {category === "Hampers" && <Badge className="ml-2 bg-rose-500 text-white text-xs h-4 px-1">New</Badge>}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-rose-100 via-pink-50 to-orange-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Sweet Moments,
                <span className="text-rose-600"> Delivered</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                Handcrafted cakes made with love, premium ingredients, and artistic perfection. Create unforgettable
                memories with our delicious creations.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  size="lg"
                  className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 h-11"
                  onClick={() => handleCategoryClick("Birthday Cakes")}
                >
                  Order Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-rose-300 text-rose-600 hover:bg-rose-50 px-6 py-3 h-11"
                  onClick={() => handleCategoryClick("All Cakes")}
                >
                  View Menu
                </Button>
              </div>
              <div className="flex items-center space-x-4 sm:space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Same Day Delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Fresh & Hygienic</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop&crop=center"
                  alt="Beautiful layered cake"
                  width={500}
                  height={500}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-rose-200 to-pink-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cakes */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Our Bestsellers</h3>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most loved cakes, crafted with premium ingredients and artistic excellence
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {featuredCakes.map((cake, index) => (
              <Card
                key={cake.id}
                className="group hover:shadow-lg transition-all duration-300 border-rose-100 overflow-hidden relative"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden cursor-pointer" onClick={() => handleProductClick(cake.id)}>
                    <Image
                      src={cake.image || "/placeholder.svg"}
                      alt={cake.name}
                      width={300}
                      height={200}
                      className="w-full h-32 sm:h-40 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 left-2 bg-rose-500 text-white text-xs px-2 py-1">{cake.tag}</Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`absolute top-2 right-2 bg-white/80 hover:bg-white h-7 w-7 p-0 ${isInWishlist(cake.id) ? "text-red-500" : "text-gray-600"
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
                      onClick={() => handleProductClick(cake.id)}
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
                      className="w-full bg-rose-600 hover:bg-rose-700 text-white h-8 sm:h-9 text-xs sm:text-sm "
                      // disabled={addToCart}
                      // disabled={addToCart}
                      onClick={() => handleAddToCart(cake)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>

                {/* Urgency & Scarcity for first few items */}
                {index && (
                  <div className="absolute top-0 right-0 p-2">
                    <UrgencyScarcity
                      stockLeft={Math.floor(Math.random() * 8) + 2}
                      isFlashDeal={index === 0}
                      flashDealEndTime={flashDealEndTime}
                      viewersCount={Math.floor(Math.random() * 20) + 5}
                      index={index}
                      className="w-48"
                    />
                  </div>
                )}
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-rose-300 text-rose-600 hover:bg-rose-50 h-11"
              onClick={() => handleCategoryClick("All Cakes")}
            >
              View All Cakes
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Testimonials Slider */}
      <TestimonialsSlider />

      {/* Occasions Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Perfect for Every Occasion</h3>
            <p className="text-base sm:text-lg text-gray-600">
              From birthdays to weddings, we have the perfect cake for your special moments
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                name: "Birthday Cakes",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&crop=center",
                color: "bg-yellow-100",
              },
              {
                name: "Anniversary",
                image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=200&h=200&fit=crop&crop=center",
                color: "bg-red-100",
              },
              {
                name: "Wedding Cakes",
                image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=200&h=200&fit=crop&crop=center",
                color: "bg-pink-100",
              },
              {
                name: "Theme Cakes",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&crop=center",
                color: "bg-blue-100",
              },
            ].map((occasion) => (
              <div
                key={occasion.name}
                className="text-center group cursor-pointer"
                onClick={() => handleCategoryClick(occasion.name)}
              >
                <div
                  className={`${occasion.color} rounded-full p-4 sm:p-6 lg:p-8 mb-3 sm:mb-4 group-hover:scale-105 transition-transform duration-300 mx-auto w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 flex items-center justify-center`}
                >
                  <Image
                    src={occasion.image || "/placeholder.svg"}
                    alt={occasion.name}
                    width={80}
                    height={80}
                    className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-cover rounded-full"
                  />
                </div>
                <h4 className="font-semibold text-gray-900 group-hover:text-rose-600 transition-colors text-sm sm:text-base">
                  {occasion.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InstagramFeed maxPosts={6} showHeader={true} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-lg sm:text-xl font-bold text-rose-400">KyraBakers</h4>
              <p className="text-gray-300 text-sm sm:text-base">
                Creating sweet memories with handcrafted cakes made with love and premium ingredients.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h5 className="font-semibold text-sm sm:text-base">Quick Links</h5>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>
                  <button className="hover:text-rose-400 transition-colors" onClick={() => router.push("/about")}>
                    About Us
                  </button>
                </li>
                <li>
                  <button className="hover:text-rose-400 transition-colors" onClick={() => router.push("/contact")}>
                    Contact
                  </button>
                </li>
                <li>
                  <button className="hover:text-rose-400 transition-colors" onClick={() => router.push("/faq")}>
                    FAQ
                  </button>
                </li>
                <li>
                  <button className="hover:text-rose-400 transition-colors" onClick={() => router.push("/referrals")}>
                    Referrals
                  </button>
                </li>
                <li>
                  <button className="hover:text-rose-400 transition-colors" onClick={() => router.push("/loyalty")}>
                    Loyalty Program
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h5 className="font-semibold text-sm sm:text-base">Categories</h5>
              <ul className="space-y-2 text-gray-300 text-sm">
                {categories.slice(1, 5).map((category) => (
                  <li key={category}>
                    <button
                      className="hover:text-rose-400 transition-colors"
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h5 className="font-semibold text-sm sm:text-base">Contact Info</h5>
              <div className="text-gray-300 space-y-2 text-sm">
                <p>📞 +91 98765 43210</p>
                <p>📧 hello@KyraBakers.com</p>
                <p>📍 Mumbai, Maharashtra</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 KyraBakers. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />

      {/* Popups */}
      <ExitIntentPopup
        isOpen={isExitIntentOpen}
        onClose={() => setIsExitIntentOpen(false)}
        onSubscribe={handleExitIntentSubscribe}
      />

      <DiscountCountdownPopup
        isOpen={isDiscountPopupOpen}
        onClose={closeDiscountPopup}
        onClaim={claimDiscount}
        discount={20}
        code="SWEET20"
        timeLimit={15}
        title="Flash Sale Alert!"
        subtitle="Limited time offer just for you"
      />
    </div>
  )
}
