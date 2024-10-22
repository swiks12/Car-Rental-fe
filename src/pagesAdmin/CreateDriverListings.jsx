import React from "react";
import createDriver from "../assets/createDriver.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const CreateDriverListings = () => {
  const [data, setData] = useState({
    name: "",
    age: "",
    contact: "",
    image: "",
  });

  // concept of useState
  const handleChange = ({ currentTarget: input }) => {
    // setData is responsible solely for updating the values of the varibales defined by useState
    setData({ ...data, [input.name]: input.value });
    // yasma hami data ko value rakhirako cham
  };

  // cloudinary upload logic
  const handleImage = (e) => {
    if (!e.target.value) {
      return;
    }
    const file = e.target.files[0];
    previewFile(file);
    console.log(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();

    // This method reads the contents of the file as a "data URL." A data URL is basically a base64-encoded version of the file, which you can use to display the image directly in the browser.
    reader.readAsDataURL(file);
    // file read huna saksei aba k garne part yaha huncha
    reader.onload = () => {
      setData({ ...data, image: reader.result });
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:4000/driver/create";
      const { data: res } = await axios.post(url, data); // await the post request
      console.log(res);
      toast.success("Driver Details Added!"); // toast will now work properly
    } catch (error) {
      console.log(error);
      toast.error("Failed to add driver details"); // optional: show error toast
    }
  };
  

  return (
    <>
      <div className="flex">
        <img
          src={createDriver}
          alt="driver"
          className="w-[40vw] h-[100vh] object-cover"
        />

        <div className="flex items-center ">
          <div className="ml-[170px]">
            <p className="text-4xl font-extrabold mb-12">
              Create Driver Listings!
            </p>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter name"
                className="rounded-[10px] border-black border p-1 pl-3 pr-3] w-[20vw] "
                name="name"
                onChange={handleChange}
                value={data.name}
                required
              />
              <div className="flex gap-8">
                <input
                  type="number"
                  placeholder="Enter Age"
                  className="rounded-[10px] border-black border p-1 pl-3 pr-3] w-[8vw] "
                  name="age"
                  onChange={handleChange}
                  value={data.age}
                  required
                />
                <input
                  type="number"
                  placeholder="Enter contact"
                  className="rounded-[10px] border-black border p-1 pl-3 pr-3] w-[10vw] "
                  name="contact"
                  onChange={handleChange}
                  value={data.contact}
                  required
                />
              </div>
              <p className="font-semibold">Click to add Driver photo</p>
              <input type="file" name="image" onChange={handleImage} />
              <input
                type="submit"
                placeholder="submit"
                className="p-2 bg-yellow-400 rounded-2xl pl-4 pr-4 w-[10vw]  ml-[65px] font-semibold"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateDriverListings;
