import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Home/Layout";
import Home from "../pages/Home/Home";

export const router=createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children:[{
            path:'',
            element:<Home/>
        }]
    }
])
