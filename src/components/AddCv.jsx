import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ApiFetching from "../services/ApiFetching";
import { Link } from "react-router-dom";

const AddCv = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0]; // Only take the first file
    setUploadedFile(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]; // Only take the first file
    setUploadedFile(file);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", uploadedFile);
      // formData.append("token", token);
      const response = await ApiFetching("POST", "/user/upload", formData);
      console.log("Upload response:", response);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="text-blue-500 font-poppins font-medium text-center text-2xl m-4">
        How do you want to Start ?
        <div className="flex w-full flex-col md:flex-row justify-center gap-2 mt-6 ">
          <Link to={'cvForm'} className="md:w-[35%] w-full h-[200px] pt-16 font-medium text-sm text-black bg-slate-100 rounded-lg border-2" >
          <div >
            Create a new CV
            <p>We will help you create a new Cv</p>
            <p className="text-md">-step by step</p>
          </div>
          </Link>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="md:w-[35%] w-full h-[200px] pt-12 font-medium text-sm bg-slate-100  rounded-lg  border-dashed border-2 border-sky-200"
          >
            <CloudUploadIcon />
            <p className="mt-2"> Already have a cv ?</p>
            <p>Drag and Drop file here </p>
            <input
              className="mt-2"
              type="file"
              onChange={handleFileInputChange}
              multiple
            />
                  <Button
              variant="contained"
              onClick={handleUpload}
              sx={{ mt: "10px" }}
            >
              Upload
            </Button>
          </div>
        </div>
        <div>
          {/* {uploadedFiles.map((file, index) => (
            <div key={index}>{file.name}</div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default AddCv;
