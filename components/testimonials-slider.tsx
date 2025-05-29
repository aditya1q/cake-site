"use client"

import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    comment:
      "Absolutely amazing! Ordered a chocolate truffle cake for my daughter's birthday and it was perfect. The taste was incredible and the presentation was beautiful. Will definitely order again!",
    cakeOrdered: "Chocolate Truffle Delight",
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Delhi",
    rating: 5,
    comment:
      "Best cake delivery service in the city! The red velvet cake was fresh, moist, and delicious. Delivery was on time and the packaging was excellent. Highly recommended!",
    cakeOrdered: "Red Velvet Romance",
    date: "2024-01-12",
  },
  {
    id: 3,
    name: "Anita Patel",
    location: "Bangalore",
    rating: 5,
    comment:
      "SweetDelights never disappoints! I've ordered multiple times for different occasions and every cake has been perfect. The quality is consistent and the taste is amazing.",
    cakeOrdered: "Black Forest Bliss",
    date: "2024-01-10",
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Pune",
    rating: 4,
    comment:
      "Great experience! The strawberry cake was fresh and delicious. The online ordering process was smooth and delivery was prompt. Will order again for sure!",
    cakeOrdered: "Strawberry Cream Dream",
    date: "2024-01-08",
  },
  {
    id: 5,
    name: "Meera Joshi",
    location: "Chennai",
    rating: 5,
    comment:
      "Outstanding quality and service! The vanilla cake was perfectly baked and the frosting was divine. My family loved it. Thank you for making our celebration special!",
    cakeOrdered: "Vanilla Bean Classic",
    date: "2024-01-05",
  },
]

export function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-rose-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">What Our Customers Say</h2>
          <p className="text-base sm:text-lg text-gray-600">Real reviews from real customers who love our cakes</p>
        </div>

        <div className="relative">
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start space-x-4">
                <Quote className="h-8 w-8 text-rose-300 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonials[currentIndex].rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <blockquote className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
                    "{testimonials[currentIndex].comment}"
                  </blockquote>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-rose-100 text-rose-600 font-semibold">
                          {testimonials[currentIndex].name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonials[currentIndex].name}</div>
                        <div className="text-sm text-gray-600">{testimonials[currentIndex].location}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-medium text-rose-600">{testimonials[currentIndex].cakeOrdered}</div>
                      <div className="text-xs text-gray-500">{testimonials[currentIndex].date}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="sm"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg border-gray-200 hover:bg-gray-50 w-10 h-10 p-0"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg border-gray-200 hover:bg-gray-50 w-10 h-10 p-0"
            onClick={goToNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-rose-600" : "bg-gray-300"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        <div className="text-center mt-4">
          <button
            className="text-xs text-gray-500 hover:text-gray-700"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          >
            {isAutoPlaying ? "⏸️ Pause" : "▶️ Play"} Auto-scroll
          </button>
        </div>
      </div>
    </section>
  )
}
