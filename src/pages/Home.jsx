import HeroVideo from '../components/home/HeroVideo'
import VehicleTypes from '../components/home/VehicleTypes'
import FeaturedVehicles from '../components/home/FeaturedVehicles'
import SellForm from '../components/home/SellForm'
import LocationMap from '../components/home/LocationMap'

export default function Home() {
    return (
        <>
            <HeroVideo />
            <VehicleTypes />
            <FeaturedVehicles />
            <SellForm />
            <LocationMap />
        </>
    )
}
