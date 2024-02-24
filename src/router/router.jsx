import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Home/Layout";
import SignIn from "../components/Auth/SignIn";
import AddCV from "../pages/Home/add-cv/AddCV";
import CvGenerator from "../pages/Home/cv-generator/CvGenerator";
import LibraryPage from "../pages/Home/librarypage/LibraryPage";
import SignUp from "../components/Auth/SignUp";
export const router=createBrowserRouter([
    {path:'/',element:<SignIn/>},
    {path:'/signUp',element:<SignUp/>},
    {
        path:'/home',
        element:<Layout/>,
        children:[{
            path:'',
            element:<AddCV/>   
        },
        {path:"cvGenerator",element:<CvGenerator/>},
    {
        path:'library',
        element:<LibraryPage/>
    }]
    }
])
