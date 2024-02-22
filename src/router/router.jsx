import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Home/Layout";
import DashBoard from "../components/DashBoard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <DashBoard />,
      },
    ],
  },
]);
