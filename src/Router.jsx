import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Services from "./Body/Services";
import Visitor from "./Body/Visitor";
import Healthy from "./Body/Healthy";
import MainBody from "./Body/MainBody";
import MainComponent from "./component/MainComponent";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainComponent />,
    children: [
      { index : true, element: <MainBody/> },
      // { path: "/", element: <MainBody/> },
      { path: "Services", element: <Services /> },
      { path: "Visitor", element: <Visitor /> },
      { path: "Healthy", element: <Healthy /> },
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
