"use client"

import Link from "next/link"
import { ArrowLeft, Star } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"
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

interface ItemDetailProps {
  product: Product
  itemAdded: boolean
  onAddToCart: (quantity: number) => void
  formatCategoryName: (category: string) => string
  onBack: () => void
}

export default function ItemDetail({ 
  product, 
  itemAdded, 
  onAddToCart, 
  formatCategoryName, 
  onBack 
}: ItemDetailProps) {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar aos Produtos
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
                <span className="text-sm text-muted-foreground">({product.rating.count} avaliações)</span>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">{product.title}</h1>
          </div>

          <div className="text-2xl md:text-3xl font-bold text-primary">${product.price.toFixed(2)}</div>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Descrição do Produto</h3>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{product.description}</p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">Disponibilidade:</span>
              <Badge variant="default">Em Estoque</Badge>
            </div>

            {itemAdded ? (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Produto adicionado ao carrinho! <Button variant="link" className="p-0 h-auto" asChild>
                    <Link href="/cart">Ver Carrinho</Link>
                  </Button>
                </AlertDescription>
              </Alert>
            ) : (
              <ItemCount stock={20} initial={1} onAdd={onAddToCart} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 