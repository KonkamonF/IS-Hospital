import React from "react";
import LogononText from "../assets/LogononText.png";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdPersonAddAlt1, MdPersonSearch } from "react-icons/md";

export default function Header() {
  return (
    <>
      <div className="flex justify-center items-center">
        <a href="/">Home</a>
        <img src={LogononText} alt="" className="w-[10%]" />
        <a href="/">Services</a>
        <a href="/">Visitor Guides</a>
        <a href="/">Be Healthy</a>
        <a href="/">About Us</a>
        <div>
          <a href="/">
            <IoPersonCircleOutline size={30} />
          </a>
          <div className="flex items-center">
            Sign-In
            <MdPersonSearch />
          </div>
          <div className="flex items-center">
            Sign-Up
            <MdPersonAddAlt1 />
          </div>
        </div>
      </div>
    </>
  );
}
