import React from "react";
import loginCar from "../assets/loginCar.avif";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import SignUp from "./SignUp";
import { ToastContainer } from "react-toastify";
const Login = () => {
  return (
    <div className="m-5 rounded-3xl border-black border-2 shadow-xl ">
      
      <div className="flex gap-[120px] place-content-center ">
      <img src={loginCar} alt="login car" className="h-[95vh] w-[55.5vw] rounded-l-3xl" />
        <form className="flex flex-col gap-7 mt-[200px]  ">
            <p className="text-4xl font-extrabold text-center mb-5">
            Login
          </p>
          <input
            type="text"
            placeholder="Email"
            className="rounded-full border-2 border-black w-[25vw] pl-6 pr-6 pt-2 pb-2"
          />

          <input
            type="password"
            placeholder="Password"
            className="rounded-full border-2 border-black w-[25vw] pl-6 pr-6 pt-2 pb-2 "
          />
          <button className="rounded-full border-2 border-black w-fit pl-6 pr-6 pt-2 pb-2 hover:bg-black hover:text-white mt-8 self-center ">
            Login
          </button>
          <p className="text-lg self-center" >
            Don't have an account?
            <Link to={"/signup"}>
            <span className="font-bold"> Sign Up! </span>

            </Link>
          </p>
        </form>
        <ToastContainer/>
        
        
      </div>
    </div>
  );
};

export default Login;
