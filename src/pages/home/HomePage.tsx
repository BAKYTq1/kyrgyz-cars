import { AboutUs } from '../../widgets/AboutUs/AboutUs'
import HeroSection from '../../widgets/hero/HeroSection'
import { PopularMakes } from '../../widgets/PopularMakes/PopularMakes'
import SearchBlock from '../../widgets/searchblock/SearchBlock'

export default function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <HeroSection />
      <SearchBlock />
      <PopularMakes />
      <AboutUs />
    </div>
  )
}