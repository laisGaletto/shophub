import ItemListContainer from "@/components/ItemListContainer"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ItemListContainer greeting="Welcome to our amazing store! Discover the best products at unbeatable prices." />
    </div>
  )
}
