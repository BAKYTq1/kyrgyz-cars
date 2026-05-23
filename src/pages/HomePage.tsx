import HeroSection from '../components/home/HeroSection'
import SearchBlock from '../components/home/SearchBlock'

export default function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <HeroSection />
      <SearchBlock />
    </div>
  )
}