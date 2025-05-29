"use client"

import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Clock, User, Share2, Heart, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { blogPosts } from "@/data/blog-posts"
import { FadeInUp, SlideInLeft, SlideInRight } from "@/components/animated-components"

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const post = blogPosts.find((p) => p.slug === slug)
  const relatedPosts = blogPosts
    .filter(
      (p) => p.id !== post?.id && (p.category === post?.category || p.tags.some((tag) => post?.tags.includes(tag))),
    )
    .slice(0, 3)

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <Button onClick={() => router.push("/blog")}>Back to Blog</Button>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-rose-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => router.push("/blog")}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span className="text-sm">Blog</span>
              </Button>
              <h1 className="text-lg sm:text-xl font-bold text-rose-600">KyraBakers</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <FadeInUp>
          <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 flex items-end">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
                <Badge className="bg-rose-500 text-white mb-4">{post.category}</Badge>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                  {post.title}
                </h1>
                <div className="flex items-center space-x-6 text-white/90 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime} min read</span>
                  </div>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </FadeInUp>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <SlideInLeft>
              <div className="prose prose-lg max-w-none">
                <div className="text-xl text-gray-600 mb-8 font-medium leading-relaxed">{post.excerpt}</div>

                <div
                  className="prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900"
                  dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }}
                />
              </div>
            </SlideInLeft>

            {/* Tags */}
            <SlideInLeft delay={0.2}>
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-rose-100 text-rose-700 hover:bg-rose-200">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </SlideInLeft>

            {/* Author Bio */}
            <SlideInLeft delay={0.3}>
              <Card className="mt-8">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-rose-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{post.author}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Expert baker and culinary artist with over 15 years of experience creating beautiful and
                        delicious cakes. Passionate about sharing knowledge and helping others discover the joy of
                        baking.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SlideInLeft>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <SlideInRight>
              <div className="sticky top-20 space-y-6">
                {/* Table of Contents */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <BookOpen className="h-4 w-4 text-rose-600" />
                      <h3 className="font-semibold text-gray-900">Quick Navigation</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <a href="#" className="block text-gray-600 hover:text-rose-600 transition-colors">
                        Introduction
                      </a>
                      <a href="#" className="block text-gray-600 hover:text-rose-600 transition-colors">
                        Main Content
                      </a>
                      <a href="#" className="block text-gray-600 hover:text-rose-600 transition-colors">
                        Tips & Tricks
                      </a>
                      <a href="#" className="block text-gray-600 hover:text-rose-600 transition-colors">
                        Conclusion
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter Signup */}
                <Card className="bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Stay Updated</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Get weekly baking tips and recipes delivered to your inbox.
                    </p>
                    <div className="space-y-2">
                      <input
                        type="email"
                        placeholder="Your email"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                      <Button size="sm" className="w-full bg-rose-600 hover:bg-rose-700 text-white">
                        Subscribe
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Popular Posts */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Popular Articles</h3>
                    <div className="space-y-3">
                      {blogPosts.slice(0, 3).map((popularPost) => (
                        <div
                          key={popularPost.id}
                          className="cursor-pointer group"
                          onClick={() => router.push(`/blog/${popularPost.slug}`)}
                        >
                          <h4 className="text-sm font-medium text-gray-900 group-hover:text-rose-600 transition-colors line-clamp-2 mb-1">
                            {popularPost.title}
                          </h4>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{popularPost.readTime} min</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </SlideInRight>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <FadeInUp delay={0.4}>
            <div className="mt-16 pt-16 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card
                    key={relatedPost.id}
                    className="group hover:shadow-lg transition-all duration-300 border-gray-200 overflow-hidden cursor-pointer"
                    onClick={() => router.push(`/blog/${relatedPost.slug}`)}
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <Image
                          src={relatedPost.image || "/placeholder.svg"}
                          alt={relatedPost.title}
                          width={300}
                          height={200}
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-2 left-2 bg-rose-500 text-white text-xs">
                          {relatedPost.category}
                        </Badge>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 group-hover:text-rose-600 transition-colors line-clamp-2 mb-2">
                          {relatedPost.title}
                        </h3>
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{relatedPost.readTime} min</span>
                          </div>
                          <span>{formatDate(relatedPost.publishedAt)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </FadeInUp>
        )}
      </div>
    </div>
  )
}
