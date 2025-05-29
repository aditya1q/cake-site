"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PinterestGrid } from "@/components/pinterest-grid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, X, Sparkles, TrendingUp, Clock } from "lucide-react"
import { allCakes } from "@/data/cakes"

// Enhanced cake images with better quality and variety
const premiumCakeImages = [
  {
    id: 101,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=800&fit=crop&crop=center",
    title: "Chocolate Ganache Drip Cake",
    description: "Decadent chocolate layers with smooth ganache drip, fresh berries, and gold accents",
    price: 1899,
    originalPrice: 2299,
    discount: 17,
    category: "Premium Cakes",
    tags: ["Chocolate", "Ganache", "Premium", "Birthday"],
    height: "tall",
    rating: 4.9,
    reviews: 156,
    prepTime: "4-6 hours",
    serves: "12-15 people",
    difficulty: "Hard",
    isNew: true,
    isTrending: true,
  },
  {
    id: 102,
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=600&fit=crop&crop=center",
    title: "Rustic Naked Wedding Cake",
    description: "Elegant semi-naked cake with fresh seasonal flowers and organic honey drizzle",
    price: 3499,
    originalPrice: 3999,
    discount: 12,
    category: "Wedding Cakes",
    tags: ["Wedding", "Rustic", "Elegant", "Flowers"],
    height: "medium",
    rating: 4.8,
    reviews: 89,
    prepTime: "6-8 hours",
    serves: "25-30 people",
    difficulty: "Hard",
    isTrending: true,
  },
  {
    id: 103,
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&h=500&fit=crop&crop=center",
    title: "Unicorn Fantasy Cake",
    description: "Magical rainbow layers with unicorn horn, edible glitter, and cotton candy clouds",
    price: 1699,
    originalPrice: 1999,
    discount: 15,
    category: "Kids Cakes",
    tags: ["Unicorn", "Rainbow", "Birthday", "Kids"],
    height: "short",
    rating: 4.7,
    reviews: 234,
    prepTime: "3-4 hours",
    serves: "10-12 people",
    difficulty: "Medium",
    isNew: true,
  },
  {
    id: 104,
    image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=600&h=750&fit=crop&crop=center",
    title: "French Macaroon Tower",
    description: "Elegant vanilla cake adorned with colorful French macaroons and gold leaf details",
    price: 2499,
    originalPrice: 2899,
    discount: 14,
    category: "Luxury Cakes",
    tags: ["Macaroon", "French", "Elegant", "Gold"],
    height: "tall",
    rating: 4.9,
    reviews: 67,
    prepTime: "5-7 hours",
    serves: "15-18 people",
    difficulty: "Hard",
  },
  {
    id: 105,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=600&fit=crop&crop=center",
    title: "Berry Bliss Garden Cake",
    description: "Light vanilla sponge with fresh seasonal berries, cream cheese frosting, and mint",
    price: 1599,
    originalPrice: 1799,
    discount: 11,
    category: "Fruit Cakes",
    tags: ["Berries", "Light", "Summer", "Fresh"],
    height: "medium",
    rating: 4.6,
    reviews: 145,
    prepTime: "2-3 hours",
    serves: "8-10 people",
    difficulty: "Easy",
    isNew: true,
  },
  {
    id: 106,
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&h=800&fit=crop&crop=center",
    title: "24K Gold Luxury Cake",
    description: "Opulent three-tier cake with 24k gold leaf accents, premium Belgian chocolate",
    price: 4999,
    originalPrice: 5999,
    discount: 17,
    category: "Luxury Cakes",
    tags: ["Gold", "Luxury", "Premium", "Belgian"],
    height: "tall",
    rating: 5.0,
    reviews: 23,
    prepTime: "8-10 hours",
    serves: "30-35 people",
    difficulty: "Hard",
    isTrending: true,
  },
  {
    id: 107,
    image: "https://images.unsplash.com/photo-1557308536-ee471ef2c390?w=600&h=600&fit=crop&crop=center",
    title: "Watercolor Artistic Cake",
    description: "Hand-painted watercolor effect with edible flowers and delicate sugar work",
    price: 2199,
    originalPrice: 2499,
    discount: 12,
    category: "Artistic Cakes",
    tags: ["Watercolor", "Artistic", "Handpainted", "Flowers"],
    height: "medium",
    rating: 4.8,
    reviews: 78,
    prepTime: "4-5 hours",
    serves: "12-14 people",
    difficulty: "Hard",
  },
  {
    id: 108,
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600&h=500&fit=crop&crop=center",
    title: "Tropical Paradise Cake",
    description: "Coconut and pineapple layers with tropical fruit decorations and toasted coconut",
    price: 1799,
    originalPrice: 2099,
    discount: 14,
    category: "Tropical Cakes",
    tags: ["Tropical", "Coconut", "Pineapple", "Summer"],
    height: "short",
    rating: 4.7,
    reviews: 112,
    prepTime: "3-4 hours",
    serves: "10-12 people",
    difficulty: "Medium",
    isNew: true,
  },
  {
    id: 109,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=750&fit=crop&crop=center",
    title: "Dark Chocolate Lava Tower",
    description: "Multi-tier dark chocolate cake with molten chocolate center and raspberry coulis",
    price: 2799,
    originalPrice: 3199,
    discount: 13,
    category: "Chocolate Cakes",
    tags: ["Dark Chocolate", "Lava", "Raspberry", "Premium"],
    height: "tall",
    rating: 4.9,
    reviews: 189,
    prepTime: "5-6 hours",
    serves: "16-20 people",
    difficulty: "Hard",
    isTrending: true,
  },
  {
    id: 110,
    image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=600&h=600&fit=crop&crop=center",
    title: "Mango Mousse Delight",
    description: "Light and airy mango mousse with fresh mango pieces and passion fruit glaze",
    price: 1499,
    originalPrice: 1699,
    discount: 12,
    category: "Mousse Cakes",
    tags: ["Mango", "Mousse", "Light", "Tropical"],
    height: "medium",
    rating: 4.6,
    reviews: 134,
    prepTime: "4-5 hours",
    serves: "8-10 people",
    difficulty: "Medium",
  },
]

// Transform existing cake data to Pinterest format with enhanced details
const pinterestItems = allCakes.map((cake, index) => {
  const heights = ["short", "medium", "tall"] as const
  const difficulties = ["Easy", "Medium", "Hard"] as const
  const heightIndex = index % 3
  const difficultyIndex = index % 3

  return {
    id: cake.id,
    image: cake.image,
    title: cake.name,
    description: cake.description?.substring(0, 100) + (cake.description && cake.description.length > 100 ? "..." : ""),
    price: cake.price,
    originalPrice: cake.originalPrice,
    discount: Math.round(((cake.originalPrice - cake.price) / cake.originalPrice) * 100),
    category: cake.category,
    tags: [cake.tag, ...cake.flavors].filter(Boolean),
    height: heights[heightIndex],
    rating: cake.rating,
    reviews: cake.reviews,
    prepTime: "2-4 hours",
    serves: cake.serves,
    difficulty: difficulties[difficultyIndex],
    isNew: index < 5,
    isTrending: cake.rating > 4.7,
  }
})

// Combine all items
const allItems = [...pinterestItems, ...premiumCakeImages]

// Get unique categories
const categories = Array.from(new Set(allItems.map((item) => item.category)))

export default function InspirationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filteredItems, setFilteredItems] = useState(allItems)
  const [columns, setColumns] = useState(4)
  const [sortBy, setSortBy] = useState("popular")

  // Handle responsive columns
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setColumns(2)
      } else if (width < 1024) {
        setColumns(3)
      } else if (width < 1536) {
        setColumns(4)
      } else {
        setColumns(5)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Filter and sort items
  useEffect(() => {
    let filtered = allItems

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    // Sort items
    switch (sortBy) {
      case "newest":
        filtered = filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case "price-low":
        filtered = filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered = filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered = filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case "trending":
        filtered = filtered.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0))
        break
      default: // popular
        filtered = filtered.sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
    }

    setFilteredItems(filtered)
  }, [searchTerm, selectedCategory, sortBy])

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced header with animations */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-100 to-orange-100 rounded-full px-4 py-2 mb-4">
            <Sparkles className="h-4 w-4 text-rose-500" />
            <span className="text-sm font-medium text-rose-700">Discover Amazing Cakes</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-rose-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-6">
            Cake Inspiration Gallery
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our most beautiful cake creations and get inspired for your next celebration. Save your favorites
            and share with friends!
          </p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span>{allItems.filter((item) => item.isTrending).length} Trending</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span>{allItems.filter((item) => item.isNew).length} New Arrivals</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <span>Updated Daily</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced search and filter section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search bar */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search cakes, flavors, occasions, or styles..."
                  className="pl-12 pr-12 py-3 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400 rounded-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <AnimatePresence>
                  {searchTerm && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 hover:bg-gray-100 rounded-full"
                        onClick={() => setSearchTerm("")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sort dropdown */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  className="text-sm border-gray-200 rounded-xl focus:border-rose-400 focus:ring-rose-400 px-3 py-2"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest First</option>
                  <option value="trending">Trending</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Category filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 mt-4 scrollbar-hide">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  className={`whitespace-nowrap rounded-full ${
                    selectedCategory === null
                      ? "bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
                      : "hover:bg-rose-50 hover:border-rose-300"
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  All Categories
                </Button>
              </motion.div>
              {categories.map((category) => (
                <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    className={`whitespace-nowrap rounded-full ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
                        : "hover:bg-rose-50 hover:border-rose-300"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results count and stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-8 flex justify-between items-center"
        >
          <div className="flex items-center gap-4">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredItems.length}</span> beautiful cakes
            </p>
            {selectedCategory && (
              <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">
                {selectedCategory}
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Pinterest grid with enhanced animations */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <PinterestGrid items={filteredItems} columns={columns} gap={20} />
        </motion.div>

        {/* Enhanced empty state */}
        <AnimatePresence>
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <div className="mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-rose-100 to-orange-100 flex items-center justify-center mb-6">
                <Search className="h-12 w-12 text-rose-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No cakes found</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                We couldn't find any cakes matching your search. Try adjusting your filters or search terms.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="outline"
                  className="border-rose-300 text-rose-600 hover:bg-rose-50 rounded-xl"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory(null)
                    setSortBy("popular")
                  }}
                >
                  Clear all filters
                </Button>
                <Button
                  className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-xl"
                  onClick={() => setSearchTerm("chocolate")}
                >
                  Try "Chocolate"
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
