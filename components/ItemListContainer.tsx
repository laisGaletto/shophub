"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

interface ItemListContainerProps {
  greeting: string
  categoryId?: string
}

const fetchProducts = async (categoryId?: string): Promise<Product[]> => {
  try {
    const url = categoryId
      ? `https://fakestoreapi.com/products/category/${encodeURIComponent(categoryId)}`
      : "https://fakestoreapi.com/products"

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}

export default function ItemListContainer({ greeting, categoryId }: ItemListContainerProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetchProducts(categoryId)
      .then(setProducts)
      .catch((err) => {
        setError("Failed to load products. Please try again later.")
        console.error("Error:", err)
      })
      .finally(() => setLoading(false))
  }, [categoryId])

  const formatCategoryName = (category: string) => {
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Greeting Section */}
      <div className="text-center space-y-3 md:space-y-4 px-4">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
          {categoryId ? `${formatCategoryName(categoryId)} Products` : "Our Products"}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">{greeting}</p>
      </div>

      {/* Error State */}
      {error && (
        <Alert variant="destructive" className="mx-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-0">
                <Skeleton className="h-48 md:h-56 w-full" />
              </CardHeader>
              <CardContent className="p-3 md:p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </CardContent>
              <CardFooter className="p-3 md:p-4 pt-0">
                <Skeleton className="h-9 md:h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col"
            >
              <CardHeader className="p-0">
                <div className="aspect-square overflow-hidden bg-white">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="h-full w-full object-contain p-4 hover:scale-105 transition-transform duration-200"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-3 md:p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {formatCategoryName(product.category)}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>★</span>
                    <span>{product.rating.rate}</span>
                    <span>({product.rating.count})</span>
                  </div>
                </div>
                <CardTitle className="text-sm md:text-base line-clamp-2 mb-2 flex-1">{product.title}</CardTitle>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
                <p className="text-lg md:text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="p-3 md:p-4 pt-0">
                <Button asChild className="w-full text-sm md:text-base">
                  <Link href={`/product/${product.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-4">
          <p className="text-lg md:text-xl text-muted-foreground">No products found in this category.</p>
          <Button asChild className="mt-4">
            <Link href="/">Browse All Products</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
