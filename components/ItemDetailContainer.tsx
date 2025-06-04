"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Star, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import ItemCount from "./ItemCount"

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

interface ItemDetailContainerProps {
  productId: string
}

const fetchProductDetail = async (productId: string): Promise<Product | null> => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`)
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error("Failed to fetch product details")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching product details:", error)
    throw error
  }
}

export default function ItemDetailContainer({ productId }: ItemDetailContainerProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetchProductDetail(productId)
      .then((fetchedProduct) => {
        setProduct(fetchedProduct)
      })
      .catch((err) => {
        setError("Failed to load product details. Please try again later.")
        console.error("Error:", err)
      })
      .finally(() => setLoading(false))
  }, [productId])

  const handleAddToCart = (quantity: number) => {
    console.log(`Added ${quantity} of product ${productId} to cart`)
  }

  const formatCategoryName = (category: string) => {
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4">
        <Skeleton className="h-10 w-32 mb-6" />
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <Skeleton className="h-64 md:h-96 w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-6 md:h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-16 md:h-20 w-full" />
            <Skeleton className="h-24 md:h-32 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-12 px-4">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Product Not Found</h2>
        <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Button>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-square bg-white p-4 md:p-8">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Details */}
        <div className="space-y-4 md:space-y-6">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
              <Badge variant="secondary" className="w-fit">
                {formatCategoryName(product.category)}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating.rate}</span>
                <span className="text-sm text-muted-foreground">({product.rating.count} reviews)</span>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">{product.title}</h1>
          </div>

          <div className="text-2xl md:text-3xl font-bold text-primary">${product.price.toFixed(2)}</div>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Product Description</h3>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{product.description}</p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">Availability:</span>
              <Badge variant="default">In Stock</Badge>
            </div>

            <ItemCount stock={20} initial={1} onAdd={handleAddToCart} />
          </div>
        </div>
      </div>
    </div>
  )
}
