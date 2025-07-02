import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://mern-backend-5osx.onrender.com/api/verify", {
        withCredentials: true,
      })
      .catch(() => {
        navigate("/login");
      });
  }, []);

  return <Outlet />;
};

export default ProtectedRoutes;
