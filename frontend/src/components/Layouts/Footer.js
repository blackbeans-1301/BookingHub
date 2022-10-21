import React, { Fragment, useState } from "react";
import Logo from "../../assets/images/logo.png";
import textLogo from "../../assets/images/text-logo.png";
import LoginModal from "../Items/LoginModal";
// import Button from "../Items/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-10 z-10 flex w-screen md:w-auto w-full">
      <div className="content-center md:px-10 xl:px-40 py-12 w-full h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
          <div className="">
            <p className="font-bold mb-2">Help</p>
            <a href="#" className="block hover:text-colorText">
              About
            </a>
            <a href="#" className="block hover:text-colorText">
              Contact
            </a>
            <a href="http://localhost:8000/Privacy" className="block hover:text-colorText">
              Privacy
            </a>
            <a href="http://localhost:8000/Support" className="block hover:text-colorText">
              Support
            </a>
          </div>

          <div className="">
            <p className="font-bold mb-2">Menu</p>
            <a href="#" className="block hover:text-colorText">
              Flights
            </a>
            <a href="#" className="block hover:text-colorText">
              Stay
            </a>
            <a href="#" className="block hover:text-colorText">
              Things to do
            </a>
            <a href="#" className="block hover:text-colorText">
              Packages
            </a>
            <a href="#" className="block hover:text-colorText">
              Explore
            </a>
            <a href="#" className="block hover:text-colorText">
              Travel Restrictions
            </a>
            <a href="#" className="block hover:text-colorText">
              Trips
            </a>
          </div>

          <div className="">
            <p className="font-bold mb-2">Contact us</p>
            <a href="#" className="block hover:text-colorText">
              <EmailIcon />
              <span className="ml-1">bookingHub@gmail.com</span>
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="text-center">
            <div className="font-bold mt-4">Follow us</div>

            <div className="mt-2 mb-2">
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
    </footer>
  );
}
