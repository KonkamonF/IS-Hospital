import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Services from "../src/User/Body/Services";
import Visitor from "../src/User/Body/Visitor";
import Healthy from "../src/User/Body/Healthy";
import MainBody from "../src/User/Body/MainBody";
import MainComponent from "../src/component/MainComponent";
import AdminPage from "./Admin/AdminPage";
import BodyAdmin from "./Admin/Body/BodyAdmin";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainComponent />,
    children: [
      { index: true, element: <MainBody /> },
      { path: "services", element: <Services /> },
      { path: "visitor", element: <Visitor /> },
      { path: "healthy", element: <Healthy /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />,
    children: [
      { index: true, element: <AdminPage /> },
      { path: "doctor", element: <BodyAdmin /> },
    ],
  },
]);

export default function Router() {
  return (
    <>
      <RouterProvider router={route} />
    </>
  );
}
