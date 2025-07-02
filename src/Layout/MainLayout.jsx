import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "../pages/SignUp";

const MainLayout = () => {
  return (
    <>
      <Outlet />
      <SignUp />
      <ToastContainer theme="dark" />
    </>
  );
};

export default MainLayout;
