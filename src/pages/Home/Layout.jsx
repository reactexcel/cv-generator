import React, { useEffect } from "react";
import MiniDrawer from "../../components/ui/MiniDrawer";
import { Outlet, useNavigate } from "react-router-dom";
const Layout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
    }
  }, []);
  return (
    <>
      <MiniDrawer pages={<Outlet />} />
    </>
  );
};

export default Layout;
