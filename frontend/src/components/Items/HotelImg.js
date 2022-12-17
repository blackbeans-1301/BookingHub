import * as React from "react";
import Slider from "react-slick";

const photos = [
  {
    src: "https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
  },
  {
    src: "https://theleela.com/prod/content/assets/styles/tl_1920_735/public/aio-banner/dekstop/deluxe-room-gurgaon-luxury-hotel.jpg?VersionId=wOgY36LtXp3fCvnDUp8ZYu_iIVWaO2j1&itok=XqyKMLlz",
  },
  {
    src: "https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg",
  },
];

export default function HotelImg() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="ml-8">
      <h1 className="text-2xl font-bold text-gray-600">Stays near you</h1>
      <h1 className="font-sans">From Sun, Dec 4 - Mon, Dec 5</h1>
      <Slider
        {...settings}
        arrows={true}
        style={{ width: "95%" }}
        className="mt-4"
      >
        {photos.map((photo, item) => (
          <img src={photo.src} key={item} />
        ))}
      </Slider>
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}
