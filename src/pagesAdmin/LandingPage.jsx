import React from "react";
import logo from "../assets/logo.png";
import landing1 from "../assets/landing1.avif";
import landing2 from "../assets/landing2.avif";


import Button from "../components/Button";

const LandingPage = () => {
  return (
    <>
      <div className="mt-0 m-4">
        {/* top part */}
        <div className="flex">
          {/* <div>
            <img src={logo} alt="logo" className="h-[15vh]" />
          </div> */}
          <div className="flex gap-6 mt-8 ml-auto mr-3">
            <Button value={"Login"} />
            <Button value={"Sign up"} />
          </div>
        </div>

        {/* middle car part */}
        <div className="mt-2">
          <img src={landing2} alt="scorpio" className="h-[70vh]" />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
