"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Star, AlertCircle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import ItemDetail from "./ItemDetail"
import { useCart } from "@/contexts/CartContext"

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
  const [itemAdded, setItemAdded] = useState(false)
  const router = useRouter()
  const { addItem } = useCart()

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetchProductDetail(productId)
      .then((fetchedProduct) => {
        setProduct(fetchedProduct)
      })
      .catch((err) => {
        setError("Falha ao carregar detalhes do produto. Tente novamente mais tarde.")
        console.error("Error:", err)
      })
      .finally(() => setLoading(false))
  }, [productId])

  const handleAddToCart = (quantity: number) => {
    if (product) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      }, quantity)
      setItemAdded(true)
    }
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
          Voltar aos Produtos
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
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Produto Não Encontrado</h2>
        <p className="text-muted-foreground mb-6">O produto que você está procurando não existe ou foi removido.</p>
        <Button onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </div>
    )
  }

  return (
    <ItemDetail 
      product={product} 
      itemAdded={itemAdded}
      onAddToCart={handleAddToCart}
      formatCategoryName={formatCategoryName}
      onBack={() => router.back()}
    />
  )
} 