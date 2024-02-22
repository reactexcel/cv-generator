import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const AddCv = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles([...uploadedFiles, ...files]);
  };
  return (
    <div className="w-full">
      <div className="text-blue-500 font-poppins font-medium text-center text-2xl m-4">
        How do you want to Start ?
        <div className="flex w-full flex-col md:flex-row justify-center gap-2 mt-6 ">
          <div className="md:w-[35%] w-full h-[200px] pt-16 font-medium text-sm text-black bg-slate-100 rounded-lg border-2">
            Create a new CV
            <p>We will help you create a new Cv</p>
            <p className="text-md">-step by step</p>
          </div>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="md:w-[35%] w-full h-[200px] pt-12 font-medium text-sm bg-slate-100  rounded-lg  border-2">
            <CloudUploadIcon />
            <p className="mt-2"> Already have a cv ?</p>
            <p>Drag and Drop file here </p>
            <input
              className="mt-2"
              type="file"
              onChange={handleFileInputChange}
              multiple
            />
          </div>
        </div>
        <div>
          {uploadedFiles.map((file, index) => (
            <div key={index}>{file.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddCv;
