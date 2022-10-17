import React from "react";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

export default function BtnSlider({ direction, moveSlide }) {
  return (
    <div>
      {direction === "next" ? (
        <button
          className="cursor-pointer w-6 h-6 font-bold rounded-full bg-slate-50 border-2 absolute flex justify-center items-center top-2/4 right-1 -translate-y-2/4 opacity-50 hover:opacity-100"
          onClick={moveSlide}
        >
          <NavigateNextIcon />
        </button>
      ) : (
        <button
          className="cursor-pointer w-6 h-6 font-bold rounded-full bg-slate-50 border-2 absolute flex justify-center items-center top-2/4 left-1 -translate-y-2/4 opacity-50 hover:opacity-100"
          onClick={moveSlide}
        >
          <NavigateBeforeIcon />
        </button>
      )}
      <button></button>
    </div>
  );
}
