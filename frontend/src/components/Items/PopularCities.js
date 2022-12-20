import * as React from "react"
import Slider from "react-slick"
import { popularCities } from "../../data/PopularCities.data"
import CityCard from "./CityCard"

export default function PopularCities() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  }

  return (
    <div className="ml-8 mt-12">
      <h1 className="text-2xl font-bold text-gray-600">Top 8 best places for hotel</h1>
      <h1 className="font-sans">See what's popular with other travelers</h1>
      <Slider {...settings} arrows={true} style={{ width: "95%" }} className="mt-4">
        {popularCities.map((item) => <CityCard data={item} />)}
      </Slider>
    </div>
  )
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  )
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  )
}