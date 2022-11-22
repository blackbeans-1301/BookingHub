import React, { useState } from "react";
import dataSlider from "./dataSlider";
import BtnSlider from "./BtnSlider";

export default function Slider({dataSlider}) {
  const [sliderIndex, setSliderIndex] = useState(1);

  const nextSlide = () => {
    if (sliderIndex !== dataSlider.length) {
      setSliderIndex(sliderIndex + 1);
    } else if (sliderIndex === dataSlider.length) {
      setSliderIndex(1);
    }
  };

  const prevSlide = () => {
    if (sliderIndex !== 1) {
      setSliderIndex(sliderIndex - 1);
    } else if (sliderIndex === 1) {
      setSliderIndex(dataSlider.length);
    }
  };

  const moveDot = (index) => {
    setSliderIndex(index);
  };

  return (
    <div className="max-w-7xl h-96 mt-8 mb-0 mx-10 relative overflow-hidden shadow-lg rounded-2xl z-0">
      {dataSlider.map((obj, index) => {
        console.log('obj', obj);
        return (
          <div
            key={obj.id}
            className="w-full h-full absolute transition duration-500 ease-in-out"
          >
            <img
              src={dataSlider[sliderIndex].image}
              className="h-80 w-full z-0"
            />
            <h3 className="text-textColor font-bold mt-2.5 ml-2.5">{dataSlider[sliderIndex].title}</h3>
            <p className="ml-2.5 text-slate-400">{dataSlider[sliderIndex].subTitle}</p>
          </div>
        );
      })}

      <BtnSlider direction={"next"} moveSlide={nextSlide} />
      <BtnSlider direction={"prev"} moveSlide={prevSlide} />

      {/* <div className="absolute w-full h-5 bottom-2.5 left-2/4 -translate-x-2/4 flex justify-center">
        {Array.from({ length: dataSlider.length }).map((item, index) => (
          <div
            onClick={() => moveDot(index)}
            className="w-5 h-5 rounded-full border-0 mx-1 bg-slate-400 cursor-pointer active:bg-slate-200 hover:bg-slate-200"
          ></div>
        ))}
      </div> */}
    </div>
  );
}
