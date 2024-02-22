import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Home/Layout";
import SignIn from "../components/Auth/SignIn";
import AddCV from "../pages/Home/add-cv/AddCV";
import CvCreatorForm from "../components/cv-creatorform/CvCreatorForm";

export const router=createBrowserRouter([
    {path:'/',element:<SignIn/>},
    {
        path:'/home',
        element:<Layout/>,
        children:[{
            path:'',
            element:<AddCV/>   
        },
        {path:"cvForm",element:<CvCreatorForm/>},
    {
        path:'library',
        element:<h2>hello</h2>
    }]
    }
])
