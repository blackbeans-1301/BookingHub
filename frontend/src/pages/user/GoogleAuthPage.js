import React from "react"
import { useQueryParam, NumberParam, StringParam } from "use-query-params"
import * as queryString from "query-string"
import { setLSItem, getLSItem, redirect } from "../../utils"

const GoogleAuthPage = ({ location }) => {
  console.log("location", location.search)
  let param = new URLSearchParams(location.search)
  let paramString = param.toString()

  console.log('type', typeof param, param)
  console.log('string', paramString)

  let token = paramString.substring(2)
  setLSItem("token", token)
  console.log("get token", getLSItem('token'))

  setTimeout(() => {
    redirect(process.env.API_URL)
  }, 100)

  return (
    <div>
    </div>
  )
}

export default GoogleAuthPage
