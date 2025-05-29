"use client"

import { Shield, Award, Clock, Heart, Users, Leaf } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Shield,
    title: "100% Fresh & Hygienic",
    description: "ISO 22000 certified kitchen with strict hygiene protocols. Every cake is baked fresh daily.",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Award,
    title: "Premium Quality Ingredients",
    description: "We use only the finest Belgian chocolate, fresh dairy, and premium ingredients sourced globally.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Users,
    title: "Handcrafted by Expert Bakers",
    description: "Our master bakers have 15+ years of experience creating perfect cakes with artistic precision.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Clock,
    title: "Same Day Delivery",
    description: "Order before 2 PM and get your cake delivered the same day. On-time delivery guaranteed.",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every cake is crafted with passion and attention to detail to make your moments special.",
    color: "text-rose-600",
    bgColor: "bg-rose-50",
  },
  {
    icon: Leaf,
    title: "Natural & Preservative-Free",
    description: "No artificial colors or preservatives. We believe in natural goodness for your health.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Why Choose SweetDelights?</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to delivering exceptional quality, freshness, and taste in every bite
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-gray-100">
              <CardContent className="p-4 sm:p-6">
                <div className={`${feature.bgColor} rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-rose-600">50,000+</div>
            <div className="text-sm text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-rose-600">15+</div>
            <div className="text-sm text-gray-600">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-rose-600">100+</div>
            <div className="text-sm text-gray-600">Cake Varieties</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-rose-600">99%</div>
            <div className="text-sm text-gray-600">On-Time Delivery</div>
          </div>
        </div>
      </div>
    </section>
  )
}
