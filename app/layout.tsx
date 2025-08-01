import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import NavBar from "@/components/NavBar"
import { CartProvider } from "@/contexts/CartContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ShopHub - E-commerce Store",
  description: "Your favorite online shopping destination",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <CartProvider>
          <NavBar />
          <main className="min-h-screen">{children}</main>
        </CartProvider>
      </body>
    </html>
  )
} 