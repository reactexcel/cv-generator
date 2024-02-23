import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, Stack } from "@mui/material";
import ApiFetching from "../services/ApiFetching";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Box } from "@mui/system";



const AddCv = () => {
  const formik = useFormik({
    initialValues: {
      file: null,
    },
    validationSchema: Yup.object({
      file: Yup.mixed().required("A file is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const formData = new FormData();
        formData.append("resume", values.file);
        const response = await ApiFetching("POST", "/user/upload", formData);
        console.log("Upload response:", response);
        toast.success('Your File has been Uploaded Successfully');
        resetForm(); // Clear form data
      } catch (error) {
        console.error("Upload error:", error);
      }
      setSubmitting(false);
    },
  });

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    formik.setFieldValue("file", file);
  };

  return (
    <div
    // id="h "
    //  className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover "
     >
      <Stack sx={{justifyContent:'center',alignItems:"center", width:'100%'}} 
      // className="absolute bg-black opacity-60 inset-0 z-0"
       />
      <div className="sm:max-w-lg m-auto p-10 bg-white rounded-xl z-10">
        <div className="text-center">
          <h2 className="mt-5 text-3xl font-bold text-gray-900">Please Upload C.V</h2>
          {/* <p className="mt-2 text-sm text-gray-400">Lorem ipsum is placeholder text.</p> */}
        </div>
        <form className="mt-8 space-y-3" onSubmit={formik.handleSubmit} method="POST">
          <div className="grid grid-cols-1 space-y-2">
            <label 
            htmlFor="h"
              className="text-sm font-bold text-gray-500 tracking-wide"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
            >
              Attach Document
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                <div className="h-full w-full text-center flex flex-col items-center justify-center ">
                  <Box sx={{display:'flex',alignItems:'center'}}>
                    {/* <img
                      className="has-mask h-36 object-center"
                      src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                      alt="freepik image"
                    /> */}
                    <CloudUploadIcon/>
                  </Box>
                  <p className="pointer-none text-gray-500 ">
                    <span className="text-sm">Drag and drop</span> files here <br /> or{" "}
                    <a href="" id="" className="text-blue-600 hover:underline">
                      select a file
                    </a>{" "}
                    from your computer
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    formik.setFieldValue("file", e.target.files[0] || null);
                  }}
                />
              </label>
            </div>
            {formik.errors.file && (
              <p className="text-red-500">{formik.errors.file}</p>
            )}
          </div>
          <p className="text-sm text-gray-300">
            <span>File type: doc, pdf, types of images</span>
          </p>
          <div>

            <Button variant="contained"
            fullWidth
              type="submit"
            >
              Upload
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCv;
