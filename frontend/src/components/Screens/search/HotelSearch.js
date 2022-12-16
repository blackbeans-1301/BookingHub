import * as React from "react";
import { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

export default function HotelSearch() {
  const [arriveDay, setArriveDay] = useState(new Date());
  const [leaveDay, setLeaveDay] = useState(new Date());

  const { arrive } = arriveDay;
  const { leave } = leaveDay;
  return (
    // listContainer
    <div className="flex justify-between mt-4">
      {/* listWapper */}
      <div className="w-full max-w-5xl flex">
        {/* listSearch */}
        <div className="flex-1 bg-amber-200 p-2.5 rounded-xl sticky top-2.5 mx-4 h-max">
          {/* lsTitle */}
          <h1 className="text-xl mb-2.5 font-bold text-sky-600">Search</h1>

          {/* lsItem */}
          <div className="">
            <label classNme="text-sm text-semibold">Destination</label>
            <input
              type="text"
              placeholder="Ha Noi"
              className="p-1 text-sm w-full mt-1"
            />
          </div>

          <div className="flex justify-between items-center mt-2">
            <label className="text-sm text-semibold">Check-in Date</label>
            <span className="">
              <Flatpickr
                className="p-1 text-sm bg-white text-right w-24"
                value={arrive}
                onChange={(arrive) => {
                  setArriveDay({ arrive });
                }}
                options={{
                  altFormat: "d/m/Y",
                  altInput: true,
                }}
                placeholder="04/07/2022"
              />
            </span>
          </div>

          <div className="flex justify-between items-center mt-2">
            <label className="text-sm text-semibold">Check-out Date</label>
            <span className="">
              <Flatpickr
                className="p-1 text-sm bg-white text-right w-24"
                value={leave}
                onChange={(leave) => {
                  setLeaveDay({ leave });
                }}
                options={{
                  altFormat: "d/m/Y",
                  altInput: true,
                }}
                placeholder="04/08/2022"
              />
            </span>
          </div>
        </div>

        {/* listResult */}
        <div className="flex3 w-full">
          {/* SearchItem */}
          <div className="p-2.5 border-2 border-sky-500 rounded-lg flex justify-between mb-2">
            {/* siImg */}
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/234762091.jpg?k=45540c95d66e3278d194a4a35994dd3491811d644b2a6cb3e3da1b187dfa7d06&o=&hp=1"
              alt=""
              className="w-40 h-40 object-cover"
            />

            {/* siDesc */}
            <div className="flex flex-col gap-1.5 flex2 ml-4">
              {/* siTitle */}
              <h1 className="text-lg text-sky-600 font-bold">
                Tower Street Apartments
              </h1>
              <span className="text-sm text-white bg-green-500 p-1 rounded w-max">
                500m from center
              </span>
              <span className="">Free airport taxi</span>
              <span className="font-bold">
                Entire studio + 1 bathroom + 21m2 full bed
              </span>
              <span className="font-bold text-green-600">
                Free cancellation
              </span>
              <span className="text-sm text-green-600">
                You can cancel later, so lock in this great price today!
              </span>
            </div>

            {/* siDetails */}
            <div className="flex flex-col flex-1 justify-between">
              {/* siRating */}
              <div className="flex justify-between">
                <span className="font-semibold">Excellent</span>
                <button className="bg-blue-700 text-white font-bold p-1 border-0">
                  8.9
                </button>
              </div>

              {/* siDetailsTexts */}
              <div className="text-right flex flex-col gap-1">
                {/* siPrice */}
                <span className="text-xl font-semibold">$123</span>
                {/* siTaxOp */}
                <span className="text-sm text-gray-500">
                  Includes taxes and fees
                </span>
                {/* siCheckButton */}
                <button className="bg-sky-300 font-bold px-2 py-1 hover:text-white hover:bg-sky-600 cursor-pointer">
                  See availability
                </button>
              </div>
            </div>
          </div>

          <div className="p-2.5 border-2 border-sky-500 rounded-lg flex justify-between mb-2">
            {/* siImg */}
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/234762091.jpg?k=45540c95d66e3278d194a4a35994dd3491811d644b2a6cb3e3da1b187dfa7d06&o=&hp=1"
              alt=""
              className="w-40 h-40 object-cover"
            />

            {/* siDesc */}
            <div className="flex flex-col gap-1.5 flex2 ml-4">
              {/* siTitle */}
              <h1 className="text-lg text-sky-600 font-bold">
                Tower Street Apartments
              </h1>
              <span className="text-sm text-white bg-green-500 p-1 rounded w-max">
                500m from center
              </span>
              <span className="">Free airport taxi</span>
              <span className="font-bold">
                Entire studio + 1 bathroom + 21m2 full bed
              </span>
              <span className="font-bold text-green-600">
                Free cancellation
              </span>
              <span className="text-sm text-green-600">
                You can cancel later, so lock in this great price today!
              </span>
            </div>

            {/* siDetails */}
            <div className="flex flex-col flex-1 justify-between">
              {/* siRating */}
              <div className="flex justify-between">
                <span className="font-semibold">Excellent</span>
                <button className="bg-blue-700 text-white font-bold p-1 border-0">
                  8.9
                </button>
              </div>

              {/* siDetailsTexts */}
              <div className="text-right flex flex-col gap-1">
                {/* siPrice */}
                <span className="text-xl font-semibold">$123</span>
                {/* siTaxOp */}
                <span className="text-sm text-gray-500">
                  Includes taxes and fees
                </span>
                {/* siCheckButton */}
                <button className="bg-sky-300 font-bold px-2 py-1 hover:text-white hover:bg-sky-600 cursor-pointer">
                  See availability
                </button>
              </div>
            </div>
          </div>

          <div className="p-2.5 border-2 border-sky-500 rounded-lg flex justify-between mb-2">
            {/* siImg */}
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/234762091.jpg?k=45540c95d66e3278d194a4a35994dd3491811d644b2a6cb3e3da1b187dfa7d06&o=&hp=1"
              alt=""
              className="w-40 h-40 object-cover"
            />

            {/* siDesc */}
            <div className="flex flex-col gap-1.5 flex2 ml-4">
              {/* siTitle */}
              <h1 className="text-lg text-sky-600 font-bold">
                Tower Street Apartments
              </h1>
              <span className="text-sm text-white bg-green-500 p-1 rounded w-max">
                500m from center
              </span>
              <span className="">Free airport taxi</span>
              <span className="font-bold">
                Entire studio + 1 bathroom + 21m2 full bed
              </span>
              <span className="font-bold text-green-600">
                Free cancellation
              </span>
              <span className="text-sm text-green-600">
                You can cancel later, so lock in this great price today!
              </span>
            </div>

            {/* siDetails */}
            <div className="flex flex-col flex-1 justify-between">
              {/* siRating */}
              <div className="flex justify-between">
                <span className="font-semibold">Excellent</span>
                <button className="bg-blue-700 text-white font-bold p-1 border-0">
                  8.9
                </button>
              </div>

              {/* siDetailsTexts */}
              <div className="text-right flex flex-col gap-1">
                {/* siPrice */}
                <span className="text-xl font-semibold">$123</span>
                {/* siTaxOp */}
                <span className="text-sm text-gray-500">
                  Includes taxes and fees
                </span>
                {/* siCheckButton */}
                <button className="bg-sky-300 font-bold px-2 py-1 hover:text-white hover:bg-sky-600 cursor-pointer">
                  See availability
                </button>
              </div>
            </div>
          </div>

          <div className="p-2.5 border-2 border-sky-500 rounded-lg flex justify-between mb-2">
            {/* siImg */}
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/234762091.jpg?k=45540c95d66e3278d194a4a35994dd3491811d644b2a6cb3e3da1b187dfa7d06&o=&hp=1"
              alt=""
              className="w-40 h-40 object-cover"
            />

            {/* siDesc */}
            <div className="flex flex-col gap-1.5 flex2 ml-4">
              {/* siTitle */}
              <h1 className="text-lg text-sky-600 font-bold">
                Tower Street Apartments
              </h1>
              <span className="text-sm text-white bg-green-500 p-1 rounded w-max">
                500m from center
              </span>
              <span className="">Free airport taxi</span>
              <span className="font-bold">
                Entire studio + 1 bathroom + 21m2 full bed
              </span>
              <span className="font-bold text-green-600">
                Free cancellation
              </span>
              <span className="text-sm text-green-600">
                You can cancel later, so lock in this great price today!
              </span>
            </div>

            {/* siDetails */}
            <div className="flex flex-col flex-1 justify-between">
              {/* siRating */}
              <div className="flex justify-between">
                <span className="font-semibold">Excellent</span>
                <button className="bg-blue-700 text-white font-bold p-1 border-0">
                  8.9
                </button>
              </div>

              {/* siDetailsTexts */}
              <div className="text-right flex flex-col gap-1">
                {/* siPrice */}
                <span className="text-xl font-semibold">$123</span>
                {/* siTaxOp */}
                <span className="text-sm text-gray-500">
                  Includes taxes and fees
                </span>
                {/* siCheckButton */}
                <button className="bg-sky-300 font-bold px-2 py-1 hover:text-white hover:bg-sky-600 cursor-pointer">
                  See availability
                </button>
              </div>
            </div>
          </div>

          <div className="p-2.5 border-2 border-sky-500 rounded-lg flex justify-between mb-2">
            {/* siImg */}
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/234762091.jpg?k=45540c95d66e3278d194a4a35994dd3491811d644b2a6cb3e3da1b187dfa7d06&o=&hp=1"
              alt=""
              className="w-40 h-40 object-cover"
            />

            {/* siDesc */}
            <div className="flex flex-col gap-1.5 flex2 ml-4">
              {/* siTitle */}
              <h1 className="text-lg text-sky-600 font-bold">
                Tower Street Apartments
              </h1>
              <span className="text-sm text-white bg-green-500 p-1 rounded w-max">
                500m from center
              </span>
              <span className="">Free airport taxi</span>
              <span className="font-bold">
                Entire studio + 1 bathroom + 21m2 full bed
              </span>
              <span className="font-bold text-green-600">
                Free cancellation
              </span>
              <span className="text-sm text-green-600">
                You can cancel later, so lock in this great price today!
              </span>
            </div>

            {/* siDetails */}
            <div className="flex flex-col flex-1 justify-between">
              {/* siRating */}
              <div className="flex justify-between">
                <span className="font-semibold">Excellent</span>
                <button className="bg-blue-700 text-white font-bold p-1 border-0">
                  8.9
                </button>
              </div>

              {/* siDetailsTexts */}
              <div className="text-right flex flex-col gap-1">
                {/* siPrice */}
                <span className="text-xl font-semibold">$123</span>
                {/* siTaxOp */}
                <span className="text-sm text-gray-500">
                  Includes taxes and fees
                </span>
                {/* siCheckButton */}
                <button className="bg-sky-300 font-bold px-2 py-1 hover:text-white hover:bg-sky-600 cursor-pointer">
                  See availability
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}