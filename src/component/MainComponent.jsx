import React from "react";
import Header from "../User/Header/Header";
import MainBody from "../User/Body/MainBody";
import MainFooter from "../User/Footer/MainFooter";
import { Outlet } from "react-router-dom";

export default function MainComponent() {
  return (
    <>
      <Header />
      <Outlet />
      <MainFooter />
    </>
  );
}
