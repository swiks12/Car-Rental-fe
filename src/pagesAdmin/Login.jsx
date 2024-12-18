import React, { useState } from "react";
import loginCar from "../assets/loginCar.avif";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import SignUp from "./SignUp";
import { toast } from "react-toastify";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    // name value should be same as the below so replace vako kura yah set vairako hoss
    email: "",
    password: "",
  });

  // handleChnage to make sure that data is the one being inputted
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  // handleLogin function to handle login functionalities

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:4000/auth/login";
      const { data: res } = await axios.post(url, data);
      if (!res.success) {
        return toast.error(res.message);
      }
  
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      localStorage.setItem("id", res.userId);
      localStorage.setItem("email", res.email);
  
      if (res.role === "user") {
        navigate("/user/home");
      } else {
        navigate("/admin/dashboard");
      }
      toast.success(res.message);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong!";
      toast.error(errorMsg);
    }
  };
  

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="m-5 rounded-3xl border-gray-300 border-2 shadow-xl pr-12">
        <div className="flex gap-[120px] place-content-center ">
          <img
            src={loginCar}
            alt="login car"
            className="h-[90vh] w-[55.5vw] rounded-l-3xl"
          />
          <form className="flex flex-col gap-7 mt-[200px]  ">
            <p className="text-4xl font-extrabold text-center mb-5">Login</p>
            <input
              type="text"
              placeholder="Email"
              className="rounded-full border-2 border-black w-[25vw] pl-6 pr-6 pt-2 pb-2"
              name="email"
              value={data.email}
              onChange={handleChange}
            />

            <input
              type="password"
              placeholder="Password"
              className="rounded-full border-2 border-black w-[25vw] pl-6 pr-6 pt-2 pb-2 "
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            <button
              className="rounded-full border-2 border-black w-fit pl-6 pr-6 pt-2 pb-2 hover:bg-black hover:text-white mt-8 self-center"
              onClick={handleLogin}
            >
              Login
            </button>
            <p className="text-lg self-center">
              Don't have an account?
              <Link to={"/signup"}>
                <span className="font-bold"> Sign Up! </span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
