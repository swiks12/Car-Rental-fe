import React from "react";
import signUp from "../assets/landing1.avif";
import signUp1 from "../assets/signUp.avif";
import signUp2 from "../assets/signUp2.avif";
import signUp3 from "../assets/signUp3.avif";
import womanInCar from "../assets/womanInCar.avif";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [data,setData]=useState({
    name:'',
    email:'',
    password:''
  });


  const [error,setError]=useState('');
  const navigate=useNavigate();

  const handleChange=({currentTarget:input})=>{
    //currentTarget vaneko aaile event lai kun chai le trigger garira vanera bujhinxa ani tyaslaihami input ma chahi rename garirachau
    setData({...data,[input.name]:input.value})
    //data ko aru properties ma asar nagarbe khali target input ko name ma chahi j value chani thyo dekhinu paro
    //example lai chai setData({...data,name:Swikriti});
    // handleChange ma chai yasto dekhirako huncha kun chai input hamle access garira cham vanera tha huncha useState ma lekheko name,password and email and input field ko name ko bhitra ko value should match yasri chai sab ko lagi kaam garxa yo
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const url="http://localhost:4000/auth/signup";
      const{data:res}=await axios.post(url,data);
      navigate("/login");
      console.log(res.message);
    }
    catch(error){
      if(error.response && error.response.status>=400 && error.response.status<=500){
        setError(error.response.data.message);
    }
  }
}
  return (
    <div className="m-5 rounded-3xl border-black border-2 shadow-xl ">
      <div className="flex gap-[190px] place-content-center ml-[150px]">
        <form className="flex flex-col gap-7 mt-[155px] " onSubmit={handleSubmit}>
          <p className="text-4xl font-extrabold text-center mb-5">
            Create an Account
          </p>
          <input
            type="text"
            placeholder="Username"
            className="rounded-full border-2 border-black w-[25vw] pl-6 pr-6 pt-2 pb-2"
            onChange={handleChange}
            name="name"
            value={data.name}
          />
          <input
            type="text"
            placeholder="Email"
            className="rounded-full border-2 border-black w-[25vw] pl-6 pr-6 pt-2 pb-2"
            onChange={handleChange}
            name="email"
            value={data.email}
          />

          <input
            type="password"
            placeholder="Password"
            className="rounded-full border-2 border-black w-[25vw] pl-6 pr-6 pt-2 pb-2 "
            onChange={handleChange}
            name="password"
            value={data.password}

          />
          {error && <div className="text-red-600">
            {error}</div>}
          <button className="rounded-full border-2 border-black w-fit pl-6 pr-6 pt-2 pb-2 hover:bg-black hover:text-white mt-8 self-center " type="submit">
            Sign Up
          </button>
          <p className="text-lg self-center">
            Already have an Account?
            <Link to={"/login"}>
              <span className="font-bold"> Log In </span>
            </Link>
          </p>
        </form>
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
