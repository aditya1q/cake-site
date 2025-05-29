"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface AdvancedImageGalleryProps {
  images: string[]
  productName: string
  tag?: string
  stockLeft?: number
}

export function AdvancedImageGallery({ images, productName, tag, stockLeft }: AdvancedImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isFullscreen, setIsFullscreen] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isZoomed || !imageRef.current) return

    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setMousePosition({ x, y })
  }

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3))
    setIsZoomed(true)
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const newLevel = Math.max(prev - 0.5, 1)
      if (newLevel === 1) setIsZoomed(false)
      return newLevel
    })
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Preload images for better performance
  useEffect(() => {
    images.forEach((src) => {
      const img = new window.Image()
      img.src = src
    })
  }, [images])

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative group">
        <div
          ref={imageRef}
          className="aspect-square rounded-lg overflow-hidden bg-gray-100 relative cursor-zoom-in"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => {
            setIsZoomed(false)
            setZoomLevel(1)
          }}
        >
          <Image
            src={images[selectedImageIndex] || "/placeholder.svg"}
            alt={`${productName} - View ${selectedImageIndex + 1}`}
            fill
            className={`object-cover transition-transform duration-300 ${isZoomed ? "scale-150" : "scale-100"}`}
            style={{
              transformOrigin: isZoomed ? `${mousePosition.x}% ${mousePosition.y}%` : "center",
              transform: isZoomed ? `scale(${zoomLevel})` : "scale(1)",
            }}
            priority={selectedImageIndex === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Badges */}
          {tag && <Badge className="absolute top-3 left-3 bg-rose-500 text-white z-10">{tag}</Badge>}
          {stockLeft && stockLeft <= 10 && (
            <Badge className="absolute top-3 right-3 bg-orange-500 text-white z-10">Only {stockLeft} left!</Badge>
          )}

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Zoom Controls */}
          <div className="absolute bottom-3 right-3 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/80 hover:bg-white h-8 w-8 p-0"
              onClick={handleZoomOut}
            >
              <ZoomOut className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white h-8 w-8 p-0" onClick={handleZoomIn}>
              <ZoomIn className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/80 hover:bg-white h-8 w-8 p-0"
              onClick={() => setIsFullscreen(true)}
            >
              <Maximize2 className="h-3 w-3" />
            </Button>
          </div>

          {/* Zoom Indicator */}
          {isZoomed && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/70 text-white px-2 py-1 rounded text-xs z-10">
              {Math.round(zoomLevel * 100)}%
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {images.map((image, index) => (
          <div
            key={index}
            className={`aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer border-2 transition-all duration-200 ${
              selectedImageIndex === index
                ? "border-rose-500 ring-2 ring-rose-200"
                : "border-transparent hover:border-rose-300"
            }`}
            onClick={() => setSelectedImageIndex(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${productName} - Thumbnail ${index + 1}`}
              width={150}
              height={150}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Image Counter */}
      <div className="text-center text-sm text-gray-500">
        {selectedImageIndex + 1} of {images.length}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={images[selectedImageIndex] || "/placeholder.svg"}
              alt={`${productName} - Fullscreen`}
              width={800}
              height={800}
              className="max-w-full max-h-full object-contain"
            />
            <Button
              variant="ghost"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setIsFullscreen(false)}
            >
              ✕
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
