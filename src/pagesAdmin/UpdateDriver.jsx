import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateDriver = () => {

    const navigate=useNavigate();
//   const [data, setData] = useState(null);
  const[data,setData]=useState({
    name:"",
    age:"",
    contact:"",
    image:""
  });

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const individualDriverInfo = async () => {
      try {
        const url = `http://localhost:4000/driver/getIndividual/${id}`;
        const { data: res } = await axios.get(url); // Await the axios call
        setData(res);
      } catch (error) {
        console.error("Error fetching driver info:", error);
      }
    };
    individualDriverInfo();
  }, [id]);



  const handleChange=({currentTarget:input})=>{
    setData({...data,[input.name]:input.value});
  }

//   cloudinary upload logic
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

console.log(data)
//   handleUpdate
const handleUpdate=async(e)=>{
    e.preventDefault();
    const url=`http://localhost:4000/driver/update/${id}`;
    const {data:res}=await axios.put(url,data);
    console.log(res);
    toast.success("Driver Update Successfull!")
    navigate("/admin/drivermgmt")

}
  return (
    <>
      <div className="bg-gray-100 w-[100vw] flex justify-center items-center">
        {data && (
          <div className="bg-white w-[50vw] p-12 flex  gap-12 h-[50vh] shadow-lg rounded-lg">
            <img
              src={data.image.url || data.image}
              className="h-[250px] w-[200px]  object-cover self-center rounded-md"
            />
            <form  className=" flex flex-col gap-6" onSubmit={handleUpdate}>
              <div className="flex gap-5">
                <p className="font-semibold">Name</p>
                <input
                  type="text"
                  name="name"
                  className=" border-black border pt-2 w-[21vw] rounded-md p-1 "
                  value={data.name}
                  onChange={handleChange}
                />
              </div>

              {/* for age and contact div */}
              <div className=" flex gap-5">
                <div className=" flex  gap-9">
                  <p className="font-semibold">Age</p>
                  <input
                    type="number"
                    name="age"
                    className="border-black border pt-2 w-[5vw] rounded-md p-1"
                    value={data.age}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex gap-5">
                  <p className="font-semibold">Contact</p>
                  <input
                    type="number"
                    name="contact"
                    className="border-black border pt-2 w-[10vw] rounded-md p-1"
                    value={data.contact}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <p className="font-semibold">Select to choose new image file</p>
                <input type="file" name="image" onChange={handleImage}/>
              </div>
              <div className="flex gap-5 justify-center">
                
                <button type="submit" className="bg-yellow-400 pl-4 pr-4 pt-2 pb-2 rounded-[10px] on hover:bg-black on hover:text-white"  >
                    Update</button>
                <button className="bg-red-500 pl-4 pr-4 pt-2 pb-2 rounded-[10px] " onClick={()=>{
                    navigate("/admin/drivermgmt");
                }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateDriver;
