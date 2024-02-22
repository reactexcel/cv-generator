import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Home/Layout";
import SignIn from "../components/Auth/SignIn";
import AddCV from "../pages/Home/add-cv/AddCV";

export const router=createBrowserRouter([
    {path:'/',element:<SignIn/>},
    {
        path:'/home',
        element:<Layout/>,
        children:[{
            path:'',
            element:<AddCV/>
        }]
    }
])
