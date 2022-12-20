import * as React from "react"
import Layout from "../components/Layouts"
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
