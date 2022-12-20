import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import StarIcon from '@mui/icons-material/Star'
import { redirect } from "../../../../utils"

export default function HotelCard(props) {
  const data = props.data
  const dateIn = props.dateIn
  const dateOut = props.dateOut

  let starList = []

  for (let i = 0; i < data.rating; i++) {
    starList.push(i)
  }

  if (!data || !dateIn || !dateOut) {
    return null
  }

  return (
    <div className="ml-8 flex flex-col mb-4 cursor-pointer">
      <div>
        <img
          src={data.Images.length > 0 ? data.Images[0].imgURL : "https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg"}
          atl="none"
          className="rounded-lg w-64 h-96 object-cover"></img>
      </div>
      <div className="mt-4"
        onClick={() => {
          redirect(`${process.env.API_URL}/user/HotelPage?x=${data.hotel_id}/${dateIn}/${dateOut}`)
        }}
      >
        <div className="">
          <div className="font-bold text-primary font-sans">{data.name}</div>
          <div className="mt-2">
            <div className="inline-block mr-2 font-sans p-1 bg-primary text-white rounded-md font-bold">{data.rating.toFixed(1)} </div>
            {starList.length > 0 ? starList.map(item => <StarIcon style={{ width: "16px" }} className="text-primary" />) : "No rating yet"}
          </div>
          <div className="text-sm">{data.province}</div>
          <div className="mt-2 font-bold font-sans text-primary">From ${data.startPrice}</div>
        </div>
      </div>
    </div>
  )
}