import React from "react";
import signUp from "../assets/landing1.avif";
import signUp1 from "../assets/signUp.avif";
import signUp2 from "../assets/signUp2.avif";
import signUp3 from "../assets/signUp3.avif";
import womanInCar from "../assets/womanInCar.avif";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="m-5 rounded-3xl border-black border-2 shadow-xl ">
      <div className="flex gap-[95px] place-content-center ml-[150px]">
        <form className="flex flex-col gap-7 mt-[155px] ">
          <p className="text-4xl font-extrabold text-center mb-5">
            Create an Account
          </p>
          <input
            type="text"
            placeholder="Username"
            className="rounded-full border-2 border-black w-[25vw] pl-6 pr-6 pt-2 pb-2"
          />
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
            Sign Up
          </button>
          <p className="text-lg self-center">
            Already have an Account?
            <Link to={"/login"}>
              <span className="font-bold"> Log In </span>
            </Link>
          </p>
        </form>
        <ToastContainer />
        <img
          src={womanInCar}
          alt="signUp"
          className="h-[95vh] w-[49vw] rounded-r-3xl"
        />
      </div>
    </div>
  );
};

export default SignUp;
