import * as React from "react"
import Slider from "react-slick"
import { PrevArrow, NextArrow } from "../Common/commonComp"

export default function HotelImg({ images }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <div className="ml-8 h-1/4 overflow-hidden flex items-center justify-center" style={{
      width: "900px",
      height: "600px",
    }}>
      <Slider
        {...settings}
        arrows={true}
        style={{ width: "90%", height: "90%" }}
        className="mt-4"
      >
        {images.map((photo, item) => (
          <img src={photo.imgURL} key={item} className="rounded-lg object-cover" />
        ))}
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
