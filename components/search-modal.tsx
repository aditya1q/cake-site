"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Star, Filter } from "lucide-react"
import { allCakes, categories, flavors, occasions } from "@/data/cakes"
import type { Cake } from "@/data/cakes"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCakes, setFilteredCakes] = useState<Cake[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All Cakes")
  const [selectedFlavor, setSelectedFlavor] = useState("")
  const [selectedOccasion, setSelectedOccasion] = useState("")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000])
  const [showFilters, setShowFilters] = useState(false)
  const router = useRouter()

  useEffect(() => {
    let filtered = allCakes

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (cake) =>
          cake.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cake.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cake.flavors.some((flavor) => flavor.toLowerCase().includes(searchQuery.toLowerCase())) ||
          cake.occasion.some((occ) => occ.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== "All Cakes") {
      filtered = filtered.filter((cake) => cake.category === selectedCategory)
    }

    // Filter by flavor
    if (selectedFlavor) {
      filtered = filtered.filter((cake) => cake.flavors.includes(selectedFlavor))
    }

    // Filter by occasion
    if (selectedOccasion) {
      filtered = filtered.filter((cake) => cake.occasion.includes(selectedOccasion))
    }

    // Filter by price range
    filtered = filtered.filter((cake) => cake.price >= priceRange[0] && cake.price <= priceRange[1])

    setFilteredCakes(filtered)
  }, [searchQuery, selectedCategory, selectedFlavor, selectedOccasion, priceRange])

  const handleCakeClick = (cakeId: number) => {
    onClose()
    router.push(`/product/${cakeId}`)
  }

  const clearFilters = () => {
    setSelectedCategory("All Cakes")
    setSelectedFlavor("")
    setSelectedOccasion("")
    setPriceRange([0, 2000])
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Search Cakes</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search for cakes, flavors, occasions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
            {(selectedCategory !== "All Cakes" || selectedFlavor || selectedOccasion) && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Flavor</label>
                <select
                  value={selectedFlavor}
                  onChange={(e) => setSelectedFlavor(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">All Flavors</option>
                  {flavors.map((flavor) => (
                    <option key={flavor} value={flavor}>
                      {flavor}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Occasion</label>
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">All Occasions</option>
                  {occasions.map((occasion) => (
                    <option key={occasion} value={occasion}>
                      {occasion}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {filteredCakes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No cakes found matching your search criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCakes.map((cake) => (
                  <div
                    key={cake.id}
                    className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleCakeClick(cake.id)}
                  >
                    <Image
                      src={cake.image || "/placeholder.svg"}
                      alt={cake.name}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{cake.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm ml-1">{cake.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">({cake.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="font-bold text-rose-600">₹{cake.price}</span>
                        <span className="text-sm text-gray-500 line-through">₹{cake.originalPrice}</span>
                        <Badge className="bg-rose-500 text-white text-xs">{cake.tag}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
