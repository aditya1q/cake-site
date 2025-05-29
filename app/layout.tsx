import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PWAInstall } from "@/components/pwa-install"
import { AuthInitializer } from "@/components/auth-initializer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "KyraBakers - Premium Cake Delivery | Fresh Handcrafted Cakes",
  description:
    "Order fresh, handcrafted cakes with same-day delivery. Premium quality ingredients, artistic perfection, and unforgettable taste. Perfect for birthdays, weddings, and celebrations.",
  keywords: "cakes, cake delivery, birthday cakes, wedding cakes, fresh cakes, handcrafted, Mumbai, same day delivery",
  authors: [{ name: "KyraBakers" }],
  creator: "KyraBakers",
  publisher: "KyraBakers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://sweetdelights.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KyraBakers - Premium Cake Delivery",
    description:
      "Order fresh, handcrafted cakes with same-day delivery. Premium quality ingredients and artistic perfection.",
    url: "https://KyraBakers.vercel.app",
    siteName: "KyraBakers",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KyraBakers - Premium Cake Delivery",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KyraBakers - Premium Cake Delivery",
    description:
      "Order fresh, handcrafted cakes with same-day delivery. Premium quality ingredients and artistic perfection.",
    images: ["/og-image.jpg"],
    creator: "@KyraBakers",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e11d48" },
    { media: "(prefers-color-scheme: dark)", color: "#e11d48" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="KyraBakers" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#e11d48" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={inter.className}>
        <AuthInitializer />
        {children}
        <PWAInstall />
      </body>
    </html>
  )
}
