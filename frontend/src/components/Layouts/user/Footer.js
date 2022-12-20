import React, { Fragment, useState } from "react"
import EmailIcon from "@material-ui/icons/Email"
import FacebookIcon from "@material-ui/icons/Facebook"
import InstagramIcon from "@material-ui/icons/Instagram"
import LinkedInIcon from "@material-ui/icons/LinkedIn"

export default function Footer() {
  return (
    <footer className="bg-primary-light text-white mt-10 z-10 flex w-screen md:w-auto w-full">
      <div className="content-center md:px-8 xl:px-8 py-8 w-full h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
          <div className="">
            <p className="font-bold mb-2">Help</p>
            <a href="#" className="block hover:text-colorText">
              About
            </a>
            <a href="#" className="block hover:text-colorText">
              Contact
            </a>
            <a
              href={`${process.env.API_URL}/user/PrivacyPage`}
              className="block hover:text-colorText"
            >
              Privacy
            </a>
            <a
              href={`${process.env.API_URL}/user/SupportPage`}
              className="block hover:text-colorText"
            >
              Support
            </a>
          </div>

          <div className="">
            <p className="font-bold mb-2">Menu</p>
            <a href={`${process.env.API_URL}/user/FlightsPage`} className="block hover:text-colorText">
              Flights
            </a>
            <a href={`${process.env.API_URL}/user/StayPage`} className="block hover:text-colorText">
              Stay
            </a>
            <a href={`${process.env.API_URL}/user/ThingsToDoPage`} className="block hover:text-colorText">
              Things to do
            </a>
            <a href="#" className="block hover:text-colorText">
              Packages
            </a>
            <a
              href={`${process.env.API_URL}/user/ExplorePage`}
              className="block hover:text-colorText"
            >
              Explore
            </a>
            <a href="#" className="block hover:text-colorText">
              Travel Restrictions
            </a>
            <a href={`${process.env.API_URL}/user/TripsPage`} className="block hover:text-colorText">
              Trips
            </a>
          </div>

          <div className="">
            <div>
              <p className="font-bold mb-2">Contact us</p>
              <a href="#" className="block hover:text-colorText">
                <EmailIcon />
                <span className="ml-1">bookingHub@gmail.com</span>
              </a>
            </div>

            <div className="flex justify-center">
              <div className="">
                <div className="font-bold mt-4 mb-2">Follow us</div>

                <div className="mb-2">
                  <a href="#" className="hover:text-colorText">
                    <FacebookIcon />
                  </a>

                  <a href="#" className="hover:text-colorText">
                    <InstagramIcon />
                  </a>

                  <a href="#" className="hover:text-colorText">
                    <LinkedInIcon />
                  </a>
                </div>
                <div>Copyright &copy; {new Date().getFullYear()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
