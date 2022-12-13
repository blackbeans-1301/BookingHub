import * as React from "react"
import Header from "../components/Layouts/LayoutComponent/Header"
import Layout from "../components/Layouts"
// import Header from "../components/Layouts/Header"
// import Layout from "../components/Layouts"
import Navigation from "../components/Layouts/LayoutComponent/Navigation"
import Main from "../components/Screens/user/Main"

const IndexPage = () => {


  return (
    <Layout>
      <Main />
    </Layout>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
