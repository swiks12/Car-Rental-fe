import React from "react";
import signUp from "../assets/landing1.avif";

const SignUp = () => {
  return (
    <div className="m-5 rounded-3xl border-black border-2 shadow-xl ">
      <div className="flex gap-[180px] ">
        <div className="flex flex-col gap-7 m-10 self-center ml-[120px]">
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
        </div>
        <img
          src={signUp}
          alt="signUp"
          className="h-[95vh] w-[49vw] rounded-r-3xl"
        />
      </div>
    </div>
  );
};

export default SignUp;
