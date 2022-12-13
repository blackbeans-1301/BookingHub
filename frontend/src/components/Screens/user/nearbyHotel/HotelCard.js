import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import StarIcon from '@mui/icons-material/Star'

export default function HotelCard(props) {
  const data = props.data
  console.log(data)
  let starList = []

  for (let i = 0; i < data.star; i++) {
    starList.push(i)
  }

  return (
    <div className="ml-8 flex flex-col mb-4">
      <div>
        <img src={data.images} atl="none" className="rounded w-80"></img>
      </div>
      <div className="">
        <div className="">
          <div>{data.name}</div>
          <div className="flex align-center">
            {starList.map(item => <StarIcon style={{ width: "16px" }} />)}
            <div className="inline-block ml-2 font-sans">Rating: {data.rating}</div>
          </div>
          <div className="text-sm">{data.address}</div>
          <div className="mt-4 font-bold font-sans">${data.startPrice}</div>
        </div>
      </div>
    </div>
  )
}