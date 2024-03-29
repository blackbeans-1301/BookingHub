import * as React from "react"
import Layout from "../../components/Layouts"
import HotelSearch from "../../components/Screens/search/HotelSearch"
import { FormatDate } from "../../components/Common/CommonFunc"
import { searchHotelByCriteria } from "../../apis/hotelApi"
import { useState, useEffect } from "react"
import { subString } from "../../utils"

const SearchHotelPage = ({ location }) => {
  const [hotel, setHotel] = useState([])

  console.log("location", location.search)
  let query = location.search
  let param = new URLSearchParams(location.search)
  let paramString = param.toString()
  console.log("type", typeof param, param)
  console.log("string", paramString)
  let queryString = query.substring(3)
  console.log('query string', queryString)

  let queryArr = queryString.split('/')
  console.log('query arr', queryArr)

  const dateIn = FormatDate(queryArr[1])
  const dateOut = FormatDate(queryArr[2])
  let data = {
    date_in: FormatDate(queryArr[1]),
    date_out: FormatDate(queryArr[2]),
    province: queryArr[0].replace("%20", " "),
    number_of_room: parseFloat(subString(queryArr[3], 4)),
    number_of_guest: parseFloat(subString(queryArr[4], 5)),
  }

  console.log('data', data)
  // let res = searchHotelByCriteria(data, setHotel);

  useEffect(() => {
    searchHotelByCriteria(data, setHotel)
  }, [])
  console.log('hotel', hotel)

  return (
    <Layout>
      <HotelSearch hotels={hotel} dateIn={dateIn} dateOut={dateOut} setHotels={setHotel} />
    </Layout>
  )
}

export default SearchHotelPage
