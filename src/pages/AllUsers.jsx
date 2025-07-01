import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";
import "../index.css";

const AllUsers = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const apiUrl = "http://localhost:3000/api/users";
      try {
        const res = await axios.get(apiUrl, { withCredentials: true });
        const data = res.data;
        setUsers(data);
      } catch (error) {
        console.log("error in axios", error);
      }
    };
    fetchUsers();
  }, []);

  const ChatUser = async (name) => {
    localStorage.setItem("ChatUser", name);
    return navigate("/Chat");
  };

  const logoutUser = async () => {
    try {
      await axios.get("http://localhost:3000/api/logout", {
        withCredentials: true,
      });
      toast.success("LoggedOut Successfully !");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const loggedInUser = localStorage.getItem("user");

  return (
    <>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6 text-white">All Users</h1>
        <button className="btn-1" onClick={logoutUser}>
          Logout
        </button>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {users
            .filter((user) => user.name !== loggedInUser)
            .map((user, index) => (
              <div
                key={index}
                className="bg-gray-800 text-white p-4 rounded shadow"
              >
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>{/* <strong>Password:</strong> {user.password} */}</p>
                <button className="btn-1 " onClick={() => ChatUser(user.name)}>
                  Chat with {user.name}
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default AllUsers;
