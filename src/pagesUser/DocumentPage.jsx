import React from "react";
import docs from "../assets/docs.png";

const DocumentPage = () => {
    const [image,setImage]="";

    const handleImage=(e)=>{
        if(!e.target.value){
            return;
        }
        const file=e.target.files[0];
        previewFile(file);
       }

       const previewFile=(file)=>{
        const reader=new FileReader();
        reader.readAsDataURL(file);    //file reader le use garera we will read the file as url base64
        reader.onload=()=>setImage(reader.result);
       }
  return (
    <>
      <div className="flex justify-center items-center ">
        <div className="flex  absolute top-[150px] z-[-1000] border-2 gap-[100px]  rounded-r-xl shadow-xl">
          <img
            src={docs}
            alt="docs"
            className="h-[70vh] w-[25vw] object-cover"
          />
          <div className=" flex justify-center items-center ">
            <div className="flex flex-col gap-5">
              <p className="font-bold text-3xl">Document Page</p>
              <p className="font-semibold">Insert Driver License Photo</p>
              <input type="file" />
              <button
                type="submit"
                className="rounded-full  w-fit pl-6 pr-6 pt-2 pb-2 bg-yellow-400 text-black hover:bg-gray-400 hover:text-black mt-8 ml-12"
                onClick={handleImage}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentPage;
