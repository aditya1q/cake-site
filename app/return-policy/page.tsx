"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, RotateCcw, Shield, Clock, CheckCircle, XCircle, Phone, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeInUp, SlideInLeft, SlideInRight } from "@/components/animated-components"

export default function ReturnPolicyPage() {
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
              <h1 className="text-lg sm:text-xl font-bold text-rose-600">Return Policy</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <FadeInUp>
          <div className="text-center mb-8 sm:mb-12">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="h-8 w-8 text-rose-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Return & Refund Policy</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your satisfaction is our priority. Learn about our return policy, refund process, and quality guarantee.
            </p>
          </div>
        </FadeInUp>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <SlideInLeft delay={0.2}>
            <Card className="text-center border-green-200 bg-green-50">
              <CardContent className="p-6">
                <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
                <p className="text-sm text-gray-600">100% satisfaction or full refund</p>
              </CardContent>
            </Card>
          </SlideInLeft>

          <FadeInUp delay={0.3}>
            <Card className="text-center border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Quick Resolution</h3>
                <p className="text-sm text-gray-600">Issues resolved within 24 hours</p>
              </CardContent>
            </Card>
          </FadeInUp>

          <SlideInRight delay={0.4}>
            <Card className="text-center border-purple-200 bg-purple-50">
              <CardContent className="p-6">
                <RotateCcw className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Easy Process</h3>
                <p className="text-sm text-gray-600">Simple return & refund process</p>
              </CardContent>
            </Card>
          </SlideInRight>
        </div>

        {/* Return Eligibility */}
        <FadeInUp delay={0.5}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>When You Can Return</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-lg">Eligible for Return/Refund:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900">Quality Issues:</strong>
                        <p className="text-sm text-gray-600">
                          Cake is damaged, stale, or doesn't match quality standards
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900">Wrong Order:</strong>
                        <p className="text-sm text-gray-600">Received incorrect cake flavor, size, or design</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900">Late Delivery:</strong>
                        <p className="text-sm text-gray-600">Delivery is more than 2 hours late from confirmed time</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900">Delivery Issues:</strong>
                        <p className="text-sm text-gray-600">Cake damaged during delivery due to our fault</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-lg">Not Eligible for Return:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900">Taste Preference:</strong>
                        <p className="text-sm text-gray-600">Personal dislike of flavor or taste</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900">Partial Consumption:</strong>
                        <p className="text-sm text-gray-600">More than 25% of cake has been consumed</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900">Delayed Complaint:</strong>
                        <p className="text-sm text-gray-600">Issue reported more than 24 hours after delivery</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900">Customer Error:</strong>
                        <p className="text-sm text-gray-600">Wrong address provided or unavailable for delivery</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeInUp>

        {/* Return Process */}
        <SlideInLeft delay={0.6}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Return Process</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-rose-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Contact Us Immediately</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Call us at +91 98765 43210 or WhatsApp within 24 hours of delivery to report the issue.
                    </p>
                    <Badge className="bg-blue-100 text-blue-700">Within 24 hours</Badge>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-rose-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Provide Details & Photos</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Share your order number, describe the issue, and send clear photos of the cake if applicable.
                    </p>
                    <Badge className="bg-green-100 text-green-700">Required</Badge>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-rose-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Investigation & Resolution</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Our team will investigate the issue and provide a resolution within 24 hours.
                    </p>
                    <Badge className="bg-purple-100 text-purple-700">24 hours</Badge>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-rose-600 font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Refund or Replacement</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Based on the investigation, we'll either provide a full refund or send a replacement cake.
                    </p>
                    <Badge className="bg-orange-100 text-orange-700">Your choice</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </SlideInLeft>

        {/* Refund Information */}
        <SlideInRight delay={0.7}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Refund Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Refund Timeline</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Credit/Debit Card</span>
                      <span className="font-semibold text-gray-900">5-7 business days</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">UPI/Digital Wallet</span>
                      <span className="font-semibold text-gray-900">2-3 business days</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Cash on Delivery</span>
                      <span className="font-semibold text-gray-900">Bank transfer in 3-5 days</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Refund Amount</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="font-semibold text-gray-900">Full Refund</div>
                        <div className="text-gray-600">Quality issues, wrong orders</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                      <div>
                        <div className="font-semibold text-gray-900">Partial Refund</div>
                        <div className="text-gray-600">Minor issues, late delivery</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                      <div>
                        <div className="font-semibold text-gray-900">Store Credit</div>
                        <div className="text-gray-600">Alternative to cash refund</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </SlideInRight>

        {/* Special Circumstances */}
        <FadeInUp delay={0.8}>
          <Card className="mb-8 border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-yellow-800">
                <AlertTriangle className="h-5 w-5" />
                <span>Special Circumstances</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-yellow-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Custom/Photo Cakes</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Returns only for quality issues</li>
                    <li>• Photo quality issues eligible for refund</li>
                    <li>• Design approval required before baking</li>
                    <li>• No returns for approved designs</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Wedding/Event Cakes</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Special handling and priority resolution</li>
                    <li>• Immediate replacement if possible</li>
                    <li>• Compensation for event disruption</li>
                    <li>• 24/7 support for urgent issues</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeInUp>

        {/* Contact Information */}
        <FadeInUp delay={0.9}>
          <Card className="bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200">
            <CardContent className="p-6 text-center">
              <Phone className="h-8 w-8 text-rose-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Need to Report an Issue?</h3>
              <p className="text-gray-600 mb-4">
                Our customer service team is ready to help resolve any issues quickly and fairly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="bg-rose-600 hover:bg-rose-700 text-white">Call +91 98765 43210</Button>
                <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                  WhatsApp Support
                </Button>
                <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                  Email Support
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Available 24/7 for urgent issues • Regular support: 9 AM - 9 PM
              </p>
            </CardContent>
          </Card>
        </FadeInUp>
      </div>
    </div>
  )
}
