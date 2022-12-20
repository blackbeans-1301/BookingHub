import * as React from "react"
import { useEffect, useState } from "react"
import { getFavoriteHotels } from "../../../apis/userApi"
import { getLSItem } from "../../../utils"
import FavoriteItem from "../../Items/FavoriteItem"

export default function Favorites() {
  const [hotels, setHotels] = useState()

  useEffect(() => {
    const getFavorites = async () => {
      const response = await getFavoriteHotels(getLSItem("token"))
      console.log(response)

      if (response) {
        setHotels(response)
      }
    }

    getFavorites()
  }, [])

  if (!hotels) {
    return null
  }

  return (
    <div className="min-h-screen w-full lg:container flex justify-center">
      <div className="container p-40  pb-0 pt-12 px-52">
        <h1 className="text-4xl font-bold text-gray-700 ">My favorite hotels</h1>
        {hotels.length === 0 ? <div className="mt-8 text-xl">There's no data about you favorite hotels! <span className="">Go to explore now.</span></div>
          : <div className="mt-12">
            {hotels.map((item) => {
              return <FavoriteItem hotel={item} />
            })}
          </div>}

      </div>

    </div>
  )
}
