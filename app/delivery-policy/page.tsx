"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Truck, Clock, MapPin, Shield, Phone, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeInUp, SlideInLeft, SlideInRight } from "@/components/animated-components"

export default function DeliveryPolicyPage() {
  const router = useRouter()

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
              <h1 className="text-lg sm:text-xl font-bold text-rose-600">Delivery Policy</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <FadeInUp>
          <div className="text-center mb-8 sm:mb-12">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-rose-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Delivery Policy</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to delivering your fresh, handcrafted cakes safely and on time. Learn about our delivery
              options, areas, and policies.
            </p>
          </div>
        </FadeInUp>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <SlideInLeft delay={0.2}>
            <Card className="text-center border-green-200 bg-green-50">
              <CardContent className="p-6">
                <Clock className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Same Day Delivery</h3>
                <p className="text-sm text-gray-600">Order before 2 PM for same-day delivery</p>
              </CardContent>
            </Card>
          </SlideInLeft>

          <FadeInUp delay={0.3}>
            <Card className="text-center border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Wide Coverage</h3>
                <p className="text-sm text-gray-600">Delivering across Mumbai & suburbs</p>
              </CardContent>
            </Card>
          </FadeInUp>

          <SlideInRight delay={0.4}>
            <Card className="text-center border-purple-200 bg-purple-50">
              <CardContent className="p-6">
                <Shield className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Safe Delivery</h3>
                <p className="text-sm text-gray-600">Temperature-controlled vehicles</p>
              </CardContent>
            </Card>
          </SlideInRight>
        </div>

        {/* Delivery Options */}
        <FadeInUp delay={0.5}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-rose-600" />
                <span>Delivery Options</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Same Day Delivery</h3>
                    <Badge className="bg-green-100 text-green-700">Popular</Badge>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Order before 2:00 PM</li>
                    <li>• Delivery between 4:00 PM - 9:00 PM</li>
                    <li>• Additional charge: ₹50</li>
                    <li>• Available Monday to Sunday</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Next Day Delivery</h3>
                    <Badge className="bg-blue-100 text-blue-700">Free</Badge>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Order anytime</li>
                    <li>• Choose your preferred time slot</li>
                    <li>• No additional charges</li>
                    <li>• Available Monday to Sunday</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Scheduled Delivery</h3>
                    <Badge className="bg-purple-100 text-purple-700">Flexible</Badge>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Book up to 7 days in advance</li>
                    <li>• Perfect for special occasions</li>
                    <li>• No additional charges</li>
                    <li>• Guaranteed delivery time</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Express Delivery</h3>
                    <Badge className="bg-red-100 text-red-700">Premium</Badge>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Delivery within 2-3 hours</li>
                    <li>• Subject to availability</li>
                    <li>• Additional charge: ₹100</li>
                    <li>• Limited to select areas</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeInUp>

        {/* Delivery Areas */}
        <SlideInLeft delay={0.6}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-rose-600" />
                <span>Delivery Areas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Mumbai City</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div>• Bandra</div>
                    <div>• Juhu</div>
                    <div>• Andheri</div>
                    <div>• Powai</div>
                    <div>• Worli</div>
                    <div>• Lower Parel</div>
                    <div>• Colaba</div>
                    <div>• Fort</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Mumbai Suburbs</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div>• Thane</div>
                    <div>• Navi Mumbai</div>
                    <div>• Borivali</div>
                    <div>• Malad</div>
                    <div>• Kandivali</div>
                    <div>• Goregaon</div>
                    <div>• Vikhroli</div>
                    <div>• Mulund</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Don't see your area?</strong> Contact us at +91 98765 43210 to check if we deliver to your
                  location.
                </p>
              </div>
            </CardContent>
          </Card>
        </SlideInLeft>

        {/* Delivery Charges */}
        <SlideInRight delay={0.7}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Delivery Charges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 font-semibold text-gray-900">Order Value</th>
                      <th className="text-left py-3 font-semibold text-gray-900">Standard Delivery</th>
                      <th className="text-left py-3 font-semibold text-gray-900">Same Day</th>
                      <th className="text-left py-3 font-semibold text-gray-900">Express</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b border-gray-100">
                      <td className="py-3">Below ₹500</td>
                      <td className="py-3">₹50</td>
                      <td className="py-3">₹100</td>
                      <td className="py-3">₹150</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3">₹500 - ₹1000</td>
                      <td className="py-3">₹30</td>
                      <td className="py-3">₹80</td>
                      <td className="py-3">₹130</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3">Above ₹1000</td>
                      <td className="py-3 text-green-600 font-semibold">FREE</td>
                      <td className="py-3">₹50</td>
                      <td className="py-3">₹100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </SlideInRight>

        {/* Important Information */}
        <FadeInUp delay={0.8}>
          <Card className="mb-8 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-orange-800">
                <AlertCircle className="h-5 w-5" />
                <span>Important Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-orange-800">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>Delivery Confirmation:</strong> We'll call you 30 minutes before delivery to confirm your
                    availability.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>Weather Conditions:</strong> Deliveries may be delayed during heavy rain or extreme weather
                    conditions.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>Address Accuracy:</strong> Please ensure your delivery address is complete and accurate to
                    avoid delays.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <strong>Recipient Availability:</strong> Someone must be available to receive the order. We cannot
                    leave cakes unattended.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </FadeInUp>

        {/* Contact Information */}
        <FadeInUp delay={0.9}>
          <Card className="bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200">
            <CardContent className="p-6 text-center">
              <Phone className="h-8 w-8 text-rose-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Need Help with Delivery?</h3>
              <p className="text-gray-600 mb-4">
                Our customer service team is here to help with any delivery questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="bg-rose-600 hover:bg-rose-700 text-white">Call +91 98765 43210</Button>
                <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                  WhatsApp Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </FadeInUp>
      </div>
    </div>
  )
}
