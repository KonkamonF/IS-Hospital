import React from "react";
import Header from "../Header/Header";
import MainBody from "../Body/MainBody";
import MainFooter from "../Footer/MainFooter";
import { Outlet } from "react-router-dom";

export default function MainComponent() {
  return (
    <>
      <Header />
      {/* <MainBody/>  */}
      <Outlet />
      <MainFooter />
    </>
  );
}
