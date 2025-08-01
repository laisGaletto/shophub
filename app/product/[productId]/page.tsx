import ItemDetailContainer from "@/components/ItemDetailContainer"

interface ProductPageProps {
  params: {
    productId: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <ItemDetailContainer productId={params.productId} />
    </div>
  )
} 