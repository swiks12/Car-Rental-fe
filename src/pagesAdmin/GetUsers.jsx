import React, { useEffect, useState } from "react";
import axios from "axios";

const GetUsers = () => {
  const [users, setUsers] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const url = "http://localhost:4000/user/get";
        const response = await axios.get(url);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-5">
        <p className="w-full h-fit text-center font-bold text-3xl mb-12 mt-5">All User Information</p>
        <div className="flex justify-center items-center w-[85vw]">
          <div className="flex flex-col gap-8 border h-fit p-12 rounded-xl shadow-md ">
            {users.length > 0 ? (
              users.map((user, index) => (
                <div key={index} className="flex gap-5 items-center">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                    alt="profile"
                    className="h-[70px] w-[70px] rounded-full"
                  />
                  <div className="border p-4 w-[30vw] rounded-2xl">
                    <p>
                      <span className="font-bold">Name:</span> {user.name}
                    </p>
                    <p>
                      <span className="font-bold">Email:</span> {user.email}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading users...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GetUsers;
