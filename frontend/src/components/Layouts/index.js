import React from "react";
import Header from "./LayoutComponent/Header";
import Navigation from "./LayoutComponent/Navigation";
import Footer from "./LayoutComponent/Footer";

export default function Layout({ children }) {
  return (
    <div className="flex relative">
      {/* <div className="fixed h-screen w-1/12 nav"> */}
        <Navigation />
      {/* </div> */}
      <div className="flex-1 h-screen absolute right-0 content">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
