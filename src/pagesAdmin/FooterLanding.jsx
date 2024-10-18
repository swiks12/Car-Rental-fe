import React from "react";
import phone from "../assets/phone.png";
import address from "../assets/address.png";
import mail from "../assets/mail.png";
import fb from "../assets/fb.png";
import insta from "../assets/insta.png";
import logo from "../assets/logo.png";

const FooterLanding = () => {
  return (
    <>
      <div className="bg-yellow-400 pt-[45px] flex ">
        <div className="flex flex-col gap-5 ml-[100px] mt-5">
          <div className="flex gap-4 h-4">
            <img src={phone} alt="phone" className="h-5" />
            <p className="font-semibold self-center">986-359-4873</p>
          </div>

          <div className="flex gap-4 h-4">
            <img src={address} alt="phone" className="h-5" />
            <p className="font-semibold self-center">Thapathali,Kathmandu</p>
          </div>

          <div className="flex gap-4 h-4">
            <img src={mail} alt="phone" className="h-5" />
            <p className="font-semibold self-center">
              wheelsondemand@gmail.com
            </p>
          </div>

          <div className="flex gap-5 mt-3 ">
            <img src={fb} alt="phone" className="h-5" />
            <img src={insta} alt="phone" className="h-5" />
          </div>
        </div>
        <img src={logo} alt="logo" className="h-[30vh] self-center ml-auto" />
      </div>
    </>
  );
};

export default FooterLanding;
