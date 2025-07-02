import "../index.css";
import form from "../assets/images/form.png";
import { useNavigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

const SignUp = ({ addUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    const newUser = { name, email, password };

    try {
      const result = await addUser(newUser);
      console.log("Response from addUser:", result);
      if (result.success) {
        toast.success("User created successfully");
        navigate("/Login");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("User already exists");
      } else {
        toast.error("Signup failed");
      }
    }
  };

  return (
    <>
      <div className="main-div">
        <div className="form">
          <div className="form img">
            <img src={form} alt="" />
          </div>

          <form className="form-inputs" onSubmit={submitForm}>
            <div className="heading">
              <h1>Sign Up</h1>
            </div>
            <h4>Name</h4>
            <input
              className="inputs"
              type="text"
              placeholder="enter your name"
              id="inputName"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <h4>E-mail</h4>
            <input
              className="inputs"
              type="text"
              placeholder="enter your mail"
              id="inputEmail"
              value={email}
              // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <h4>Password</h4>
            <input
              className="inputs"
              type="password"
              name=""
              id="inputPassword"
              placeholder="enter your password"
              value={password}
              // required
              // pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
              minLength={6}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn">Sign Up</button>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
      {/* <ToastContainer theme="dark" /> */}
    </>
  );
};

export default SignUp;

// onClick={() => navigate("/Login")}
