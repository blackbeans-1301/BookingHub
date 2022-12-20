import * as React from "react"
import { FormatDate } from "../Common/CommonFunc"
import { redirect } from "../../utils"

export default function CityCard(props) {
  const data = props.data

  let startDate = new Date()
  let endDate = new Date()
  endDate.setDate(startDate.getDate() + 1)

  const searchCity = async () => {
    redirect(`${process.env.API_URL}/user/SearchHotelPage?x=${data.name}/${FormatDate(startDate)}/${FormatDate(endDate)}/room${1}/guest${1}`)
  }

  return (
    <div className="ml-8 flex flex-col mb-4">
      <div>
        <img src={data.imageUrl} atl="none" className="rounded-lg" style={imageStyle}></img>
      </div>
      <div className="mt-2 cursor-pointer"
        onClick={searchCity}>
        <div className="">
          <div className="font-bold text-primary font-sans text-xl">{data.name}</div>
          <div className="flex align-center">
          </div>
        </div>
      </div>
    </div>
  )
}

const imageStyle = {
  width: 600,
  height: 400,
}