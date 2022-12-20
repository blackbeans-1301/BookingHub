import * as React from "react"
import HotelCard from "./HotelCard"
import Slider from "react-slick"

const data = [{
  id: 1,
  images: "https://content.r9cdn.net/rimg/himg/a4/2f/b4/ice-136573-72722449_3XL-897123.jpg?width=226&height=200&xhint=520&yhint=333&crop=true&watermarkheight=14&watermarkpadding=5",
  star: 4,
  name: "Oakwood Residence Hanoi",
  criteria: "Hồ bơi, Phòng Gym",
  rating: 9,
  startPrice: 83,
  address: "Tây Hồ"
},
{
  id: 2,
  images: "https://content.r9cdn.net/rimg/himg/a4/2f/b4/ice-136573-72722449_3XL-897123.jpg?width=226&height=200&xhint=520&yhint=333&crop=true&watermarkheight=14&watermarkpadding=5",
  star: 4,
  name: "Oakwood Residence Hanoi",
  criteria: "Hồ bơi, Phòng Gym",
  rating: 9,
  startPrice: 83,
  address: "Tây Hồ"
},
{
  id: 3,
  images: "https://content.r9cdn.net/rimg/himg/a4/2f/b4/ice-136573-72722449_3XL-897123.jpg?width=226&height=200&xhint=520&yhint=333&crop=true&watermarkheight=14&watermarkpadding=5",
  star: 4,
  name: "Oakwood Residence Hanoi",
  criteria: "Hồ bơi, Phòng Gym",
  rating: 9,
  startPrice: 83,
  address: "Tây Hồ"
},
{
  id: 4,
  images: "https://content.r9cdn.net/rimg/himg/a4/2f/b4/ice-136573-72722449_3XL-897123.jpg?width=226&height=200&xhint=520&yhint=333&crop=true&watermarkheight=14&watermarkpadding=5",
  star: 4,
  name: "Oakwood Residence Hanoi",
  criteria: "Hồ bơi, Phòng Gym",
  rating: 9,
  startPrice: 83,
  address: "Tây Hồ"
},
{
  id: 4,
  images: "https://content.r9cdn.net/rimg/himg/a4/2f/b4/ice-136573-72722449_3XL-897123.jpg?width=226&height=200&xhint=520&yhint=333&crop=true&watermarkheight=14&watermarkpadding=5",
  star: 4,
  name: "Oakwood Residence Hanoi",
  criteria: "Hồ bơi, Phòng Gym",
  rating: 9,
  startPrice: 83,
  address: "Tây Hồ"
},
{
  id: 4,
  images: "https://content.r9cdn.net/rimg/himg/a4/2f/b4/ice-136573-72722449_3XL-897123.jpg?width=226&height=200&xhint=520&yhint=333&crop=true&watermarkheight=14&watermarkpadding=5",
  star: 4,
  name: "Oakwood Residence Hanoi",
  criteria: "Hồ bơi, Phòng Gym",
  rating: 9,
  startPrice: 83,
  address: "Tây Hồ"
},
]

export default function NearbyHotel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  }

  return (
    <div className="ml-8">
      <h1 className="text-2xl font-bold text-gray-600">Stays near you</h1>
      <h1 className="font-sans">From Sun, Dec 4 - Mon, Dec 5</h1>
      <Slider {...settings} arrows={true} style={{ width: "95%" }} className="mt-4">
        {data.map((item) => <HotelCard data={item} />)}
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