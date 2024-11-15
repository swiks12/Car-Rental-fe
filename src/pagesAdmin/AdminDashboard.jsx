import React from "react";
import woman from "../assets/woman.png";

const AdminDashboard = () => {
  return (
    <>
      <div className=" h-[100vh] w-[100vw] flex  flex-col justify-center items-center gap-[50px] bg-yellow-gray">
        <p className="text-4xl  font-extrabold mt-12">Welcome to Admin Dashboard </p>
        <img src={woman} alt="woman" className="h-[80vh] w-[40vw] object-cover" />
      </div>
    </>
  );
};

export default AdminDashboard;
