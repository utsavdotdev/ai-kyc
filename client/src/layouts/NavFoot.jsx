import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NavFoot = () => {
  const accessToken = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  
  console.log(accessToken, role);
  useEffect(() => {
    if (accessToken !== null && role === "org") {
      return navigate("/dashboard");
    }
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default NavFoot;
