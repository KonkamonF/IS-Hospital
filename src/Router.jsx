import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainComponent from "./component/MainComponent";

const route = createBrowserRouter([
    {
        path : "/",
        element: <MainComponent/>,
        children:[{

        }]
    }
])

export default function Router(){
    return (
        <div>
            <RouterProvider route={route}/>
        </div>
    )
}