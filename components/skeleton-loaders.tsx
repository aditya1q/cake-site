"use client"

import { Card, CardContent } from "@/components/ui/card"

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse">
      <CardContent className="p-0">
        <div className="w-full h-32 sm:h-40 lg:h-48 bg-gray-200"></div>
        <div className="p-3 sm:p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="flex items-center space-x-2">
            <div className="h-3 bg-gray-200 rounded w-12"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-12"></div>
            <div className="h-4 bg-gray-200 rounded w-8"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg bg-gray-200"></div>
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="aspect-square rounded-lg bg-gray-200"></div>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="h-6 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="h-6 bg-gray-200 rounded w-32"></div>
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="h-10 bg-gray-200 rounded w-24"></div>
            <div className="h-8 bg-gray-200 rounded w-20"></div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>

          <div className="flex space-x-3">
            <div className="h-11 bg-gray-200 rounded flex-1"></div>
            <div className="h-11 bg-gray-200 rounded flex-1"></div>
            <div className="h-11 bg-gray-200 rounded w-11"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TestimonialSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-start space-x-4">
          <div className="h-8 w-8 bg-gray-200 rounded"></div>
          <div className="flex-1 space-y-4">
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-5 w-5 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ImageSkeleton({ className = "" }: { className?: string }) {
  return <div className={`bg-gray-200 animate-pulse ${className}`}></div>
}
