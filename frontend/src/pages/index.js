import * as React from "react"
import Header from "../components/Layouts/Header"
import Layout from "../components/Layouts"
import Navigation from "../components/Layouts/Navigation"
import Main from "../components/Layouts/Main"

const IndexPage = () => {
  return (
    <div className="flex">
      {/* <Header /> */}
      <Navigation />
      <Main />
      {/* this is home page <br />
      <span>there is something in here</span> */}
    </div>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
