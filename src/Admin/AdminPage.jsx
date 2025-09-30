import React from "react";
import HeaderAdmin from "./Header/HeaderAdmin";
import BodyAdmin from "./Body/BodyAdmin";
import SidebarAdmin from "./Header/SidebarAdmin";
import { Outlet } from "react-router";

export default function AdminPage() {
  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin />
      {/* <BodyAdmin/> */}
      <Outlet />
    </>
  );
}
