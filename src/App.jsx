import "./App.css";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import axios from "axios";
import AllUsers from "./pages/AllUsers";
import Chat from "./pages/Chat";
import ProtectedRoutes from "./utils/ProtectedRoutes";
// import { ToastContainer } from "react-toastify";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Router,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./Layout/MainLayout";

const App = () => {
  //add USER
  const addUser = async (newUser) => {
    try {
      const res = await axios.post(
        // "http://localhost:3000/api/signup/",
        "https://mern-backend-ivory-six.vercel.app/api/signup/",
        newUser
      );
      return res.data;
    } catch (error) {
      console.error("error in adding", error);
      throw error; // Re-throw the error to handle it in the calling function
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route path="/SignUp" element={<SignUp addUser={addUser} />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/AllUsers" element={<AllUsers />} />
          <Route path="/Chat" element={<Chat />} />
        </Route>
        <Route path="/LogIn" element={<LogIn />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
