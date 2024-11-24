import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const CarManagement = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const url = "http://localhost:4000/car/get";
        const { data: res } = await axios.get(url);
        setCars(res);
      } catch (error) {
        toast.error("Failed to fetch car information");
      }
    };
    fetchCars();
  }, []);

  // handle Delete
  const handleDelete = async (id) => {
    try {
      const url = `http://localhost:4000/car/delete/${id}`;
      await axios.delete(url);
      setCars(cars.filter((car) => car._id !== id));
      toast.success("Car information deleted successfully!");
    } catch (error) {
      toast.error("Error deleting car information");
    }
  };

  return (
    <>
      <div className=" w-[100vw]">
        <p className="text-4xl font-extrabold text-center w-[80vw] mt-9">
          Car Management
        </p>
        <div className="mt-[58px] flex gap-12 m-[100px] ">
          {cars.map((car, key) => (
            <div
              key={key}
              className="border-gray-200 border-[2px] rounded-xl w-[15vw] flex flex-col justify-center items-center pt-4 pb-4 bg-white shadow-xl"
            >
              <img
                src={car.image.url}
                alt="CarPhoto"
                className="h-[100px] w-[200px] object-cover rounded-xl"
              />
              <p className="font-semibold mt-2">{car.brand}</p>
              <p className="text-gray-600">{car.model}</p>
              <p className="text-gray-500">{car.numberPlate}</p>
              <div className="flex gap-5 mt-2">
                <button
                  onClick={() => {
                    navigate(`/admin/carmgmt/update/${car._id}`);
                  }}
                >
                  <span className="material-symbols-outlined text-blue-600">
                    edit
                  </span>
                </button>
                <button
                  onClick={() => {
                    handleDelete(car._id);
                  }}
                >
                  <span className="material-symbols-outlined text-red-500">
                    delete
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed right-0 bottom-0 m-6">
        <div
          className="h-[60px] w-[60px] rounded-full bg-black text-white flex items-center justify-center"
          onClick={() => {
            navigate("/admin/carmgmt/create");
          }}
        >
          <span className="material-symbols-outlined">add</span>
        </div>
      </div>
    </>
  );
};

export default CarManagement;
