import ItemListContainer from "@/components/ItemListContainer"

interface CategoryPageProps {
  params: {
    categoryId: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryName = params.categoryId.charAt(0).toUpperCase() + params.categoryId.slice(1)

  return (
    <div className="container mx-auto px-4 py-8">
      <ItemListContainer greeting={`Explore nossa coleção de ${categoryName}`} categoryId={params.categoryId} />
    </div>
  )
} 