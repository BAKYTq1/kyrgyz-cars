import DeliveryMap from '../../widgets/delivery-map/DeliveryMap'
import HeroSection from '../../widgets/hero/HeroSection'
import FeaturedLots from '../../widgets/lots/FeaturedLots'
import { AboutUs } from '../../widgets/AboutUs/AboutUs'
import { PopularMakes } from '../../widgets/PopularMakes/PopularMakes'
import SearchBlock from '../../widgets/searchblock/SearchBlock'

export default function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <HeroSection />
      <SearchBlock />
      <FeaturedLots/>
      <AboutUs />
      <PopularMakes />
      <DeliveryMap/>
    </div>
  )
}