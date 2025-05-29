"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Clock, User, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { blogPosts } from "@/data/blog-posts"
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animated-components"

export default function BlogPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("newest")

  const categories = ["All", "Tips", "Recipes", "Occasions", "Storage"]

  const filteredPosts = blogPosts
    .filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        case "readTime":
          return a.readTime - b.readTime
        default:
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      }
    })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-rose-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => router.push("/")}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span className="text-sm">Home</span>
              </Button>
              <h1 className="text-lg sm:text-xl font-bold text-rose-600">SweetDelights Blog</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
        {/* Hero Section */}
        <FadeInUp>
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Sweet Stories & Expert Tips</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover baking secrets, storage tips, celebration ideas, and delicious recipes from our master bakers
            </p>
          </div>
        </FadeInUp>

        {/* Search and Filters */}
        <FadeInUp delay={0.2}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="readTime">Quick Reads</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </FadeInUp>

        {/* Results Count */}
        <FadeInUp delay={0.3}>
          <div className="mb-6">
            <p className="text-gray-600">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </FadeInUp>

        {/* Blog Posts Grid */}
        <StaggerContainer>
          {filteredPosts.length === 0 ? (
            <FadeInUp delay={0.4}>
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Search className="h-24 w-24 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("All")
                    setSortBy("newest")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </FadeInUp>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPosts.map((post) => (
                <StaggerItem key={post.id}>
                  <Card
                    className="group hover:shadow-lg transition-all duration-300 border-gray-200 overflow-hidden cursor-pointer h-full"
                    onClick={() => router.push(`/blog/${post.slug}`)}
                  >
                    <CardContent className="p-0 h-full flex flex-col">
                      <div className="relative overflow-hidden">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          width={400}
                          height={250}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-3 left-3 bg-rose-500 text-white">{post.category}</Badge>
                      </div>

                      <div className="p-4 sm:p-6 flex-1 flex flex-col">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.readTime} min read</span>
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">{post.excerpt}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 2 && (
                              <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                                +{post.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">{formatDate(post.publishedAt)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </div>
          )}
        </StaggerContainer>

        {/* Newsletter Signup */}
        <FadeInUp delay={0.6}>
          <div className="mt-16 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg p-6 sm:p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Get the latest baking tips, recipes, and sweet stories delivered to your inbox every week
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button className="bg-rose-600 hover:bg-rose-700 text-white">Subscribe</Button>
            </div>
          </div>
        </FadeInUp>
      </div>
    </div>
  )
}
