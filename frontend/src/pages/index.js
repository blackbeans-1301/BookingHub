import * as React from "react"
import Layout from "../components/Layouts"
import Main from "../components/Screens/user/Main"

const IndexPage = () => {
  return (
    <Layout>
      <Main />
    </Layout>
    // <div className="flex relative">
    //   <div className="container">
    //     {/* <Header /> */}

    //     <section className="flex">
    //       <Navigation />
    //       <Main />
    //     </section>
    //   </div>
    // </div>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
