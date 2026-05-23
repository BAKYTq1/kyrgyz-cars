import HeroSection from '../../widgets/hero/HeroSection'
import SearchBlock from '../../widgets/searchblock/SearchBlock'

export default function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <HeroSection />
      <SearchBlock />
    </div>
  )
}