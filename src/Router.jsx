import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainComponent from "./component/MainComponent";
import Services from "./Body/Services";
import Visitor from "./Body/Visitor";
import Healthy from "./Body/Healthy";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainComponent />,
    children: [
      { path: "/", element: <MainComponent /> },
      { path: "services", element: <Services /> },
      { path: "Visitor", element: <Visitor /> },
      { path: "Healthy", element: <Healthy/> },
    ],
  },
]);

export default function Router() {
  return (
    <div>
      <RouterProvider route={route} />
    </div>
  );
}
