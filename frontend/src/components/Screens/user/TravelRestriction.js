import * as React from "react"
import Slider from "react-slick"
import { popularCities } from "../../../data/PopularCities.data"
import CityCard from "../../Items/CityCard"
import worldRestriction from "../../../assets/images/world-restriction.png"

const restrictData = [
  {
    id: 1,
    color: "#0f991d",
    name: "Open",
    description: "Borders are open - there are no restrictions or requirements for most visitors at this time.",
    numberOfCountry: 141,
    status: "countries are open",
  },
  {
    id: 2,
    color: "#cca300",
    name: "Open with restrictions",
    description: "Borders are open to visitors who are fully vaccinated, and/or can provide a negative COVID-19 PCR or antigen test result, and/or will quarantine upon arrival.",
    numberOfCountry: 73,
    status: "countries are open with restrictions",
  },
  {
    id: 3,
    color: "#cc0029",
    name: "Closed",
    description: "Borders are closed - only citizens, residents returning home, or people in other special circumstances may enter.",
    numberOfCountry: 12,
    status: "countries are closed",
  }
]

const TravelRestriction = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  }

  return (
    <div className="min-h-full p-16 px-28 items-center">
      <div className="lg:container"></div>
      <h1 className="text-primary text-4xl font-bold mb-4">Travel restrictions worldwide</h1>
      <p className="w-2/3 mb-4">The travel status of individual countries can change suddenly, and we know it can be hard to stay on top of it all. That's why we've created this page: so you can get the information you need when considering and planning travel.</p>
      <p className="w-2/3 mb-4">Just enter your departure country below - the map will then change to reflect countries' opening status and any entry requirements for air travelers. Be sure to double check with your country's government site before booking a flight.</p>

      <img src={worldRestriction} className="rounded-md"></img>

      <div className="flex mt-8">
        {restrictData.map((item) => {
          return <RestrictionTag data={item} />
        })}
      </div>

      <div className="mt-12 text-2xl font-bold text-primary">Destinations you can travel to now</div>
      <div className="mt-2">For those destinations that may have current travel advisories issued by authorities, we’re including alerts on our site when you search that will let you know there could be an issue with your route.</div>

      <Slider {...settings} arrows={true} style={{ width: "95%" }} className="mt-4">
        {popularCities.map((item) => <CityCard data={item} />)}
      </Slider>

    </div>
  )
}

function RestrictionTag({ data }) {
  return <div className="w-1/3 mx-4 rounded-lg bg-primary">
    <div className="container p-4">
      <div className="flex mb-4 items-center">
        <div className={`w-4 h-4 mr-2 rounded-md`} style={{ backgroundColor: data.color }}></div>
        <span className="text-white font-bold">{data.name}</span>
      </div>

      <div className="text-white text-sm h-32">{data.description}</div>
      <div className="text-white text-2xl mb-4">{data.numberOfCountry}</div>
      <div className="text-white text-lg">{data.status}</div>
    </div>
  </div>
}

export default TravelRestriction