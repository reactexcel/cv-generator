import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, Stack } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import ApiFetching from "../services/ApiFetching";
import { Document, Page } from "react-pdf";

const AddCv = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
        formData.append("resume", values.file);

        const response = await ApiFetching("POST", "/user/upload", formData);
        console.log("Upload response:", response);
        toast.success("Your File has been Uploaded Successfully");
        resetForm();
        setPdfFile(false);
        setLoading(false);
      } catch (error) {
        console.error("Upload error:", error);
      }
      setSubmitting(false);
    },
  });
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfFile, setPdfFile] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <div>
      <Stack
        sx={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
        <div className="w-full lg:w-[40%] m-auto md:p-10 md:w-[60%] p-2 bg-white rounded-xl z-10">
          <div className="text-center">
            <h2 className="mt-5 md:text-2xl text-sm w-full font-poppins md:font-semibold font-medium text-gray-900">
              Please Upload C.V
            </h2>
          </div>
          <form
            className="mt-8 w-full space-y-3"
            onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 space-y-2">
              <label
                htmlFor="file"
                className="text-sm font-bold text-gray-500 tracking-wide"
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const file = e.dataTransfer.files[0];
                  formik.setFieldValue("file", file);
                }}>
                Attach Document
              </label>
              <div
                className={`flex items-center justify-center w-full ${
                  isDragging
                    ? "border-blue-500 border-dashed"
                    : "border-gray-300 border"
                } rounded-lg h-60 p-10 group text-center`}>
                <label className="flex flex-col rounded-lg w-full h-full">
                  <div className="h-full w-full text-center flex flex-col items-center  justify-center">
                    {pdfFile ? (
                      <div className="md:h-[200px] md:w-[150px] w-full h-fit overflow-hidden">
                        <Document
                          file={pdfFile}
                          onLoadSuccess={onDocumentLoadSuccess}>
                          <Page pageNumber={1} />
                        </Document>
                      </div>
                    ) : (
                      <>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CloudUploadIcon />
                        </Box>
                        <p className="pointer-none text-gray-500 ">
                          <span className="text-sm">Drag and drop</span> files
                          here <br /> or{" "}
                          <span className="text-blue-600 hover:underline cursor-pointer">
                            select a file
                          </span>{" "}
                          from your computer
                        </p>
                        <input
                          type="file"
                          id="file"
                          name="file"
                          style={{ position: "absolute", left: "-9999px" }}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "file",
                              e.target.files[0] || null
                            );
                            setPdfFile(e.target.files[0]);
                          }}
                        />
                      </>
                    )}
                  </div>
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
              <Button variant="contained" fullWidth type="submit">
                {loading ? (
                  <CircularProgress sx={{ color: "inherit" }} />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Stack>
    </div>
  );
};

export default AddCv;
