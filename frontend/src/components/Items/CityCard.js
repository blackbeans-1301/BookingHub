import * as React from "react"

export default function CityCard(props) {
  const data = props.data

  return (
    <div className="ml-8 flex flex-col mb-4">
      <div>
        <img src={data.imageUrl} atl="none" className="rounded-lg" style={imageStyle}></img>
      </div>
      <div className="mt-2">
        <div className="">
          <div className="font-bold text-primary font-sans text-md">{data.name}</div>
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