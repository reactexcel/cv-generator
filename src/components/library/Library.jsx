import { useState, useEffect } from "react";
import ApiFetching from "../../services/ApiFetching";
import { useDispatch, useSelector } from "react-redux";
import { setCvData } from "../../redux/slices/CvSlice";
import DownloadIcon from "@mui/icons-material/Download";
import { pdfjs } from "react-pdf";
import Stack from "@mui/material/Stack";
import ModalComponent from "./ModalComponent";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const Library = () => {
  const navigate=useNavigate()
  // const id=useSelector(state=>state.CvSlice.UserId)
  const dispatch = useDispatch();
  const data = useSelector((state) => state.CvSlice.getCvData);
  const handleDownloadPdf = (link) => {
    const anchor = document.createElement("a");
    anchor.href = link;
    anchor.setAttribute("download", "CV.pdf");

    document.body.appendChild(anchor);
    anchor.click();

    document.body.removeChild(anchor);
  };

  const [titleName, setTitleName] = useState(null);
  console.log(titleName);


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await ApiFetching("GET", "user/get", null);
        const data = response.data;
        if (data.success === true) {
          console.log(response.data);
          dispatch(setCvData(data.user));
          setTitleName(data.user.cvLink);
        }
      } catch (error) {
        console.log(error, "afsasd");
      }
    };
    getData();
  }, []);

  return (
    <Stack
      sx={{ wordBreak: "break-all" }}
      className="font-poppins bg-slate-200 h-fit shadow-sm rounded-md flex flex-col">
      <Stack
        direction={{ md: "row", xs: "column" }}
        sx={{ justifyContent: "space-between", p: "30px" }}>
        <div className="md:text-lg text-sm font-semibold">
          Name:{data && data.firstname + " " + data.lastname}
        </div>
        <div className="md:text-lg text-sm font-semibold ">
          {" "}
          Email:{data && data.email}
        </div>
        <div className="ms:text-lg text-sm font-semibold">
          Mobile No :{data && data.mobile}
        </div>
      </Stack>
      <div>
        <Stack className="border-2 p-4 text-lg rounded-sm gap-2">
          {data &&
            data.cvLink &&
            data.cvLink.map((link, index) => (
              <div
                className="flex flex-col gap-1 w-full border-2 border-gray-400 p-2 rounded-md"
                key={index}>
                <div className="flex font-medium w-full  justify-between">
                  <div className="flex gap-2 leading-0">
                    <div> {index + 1}.</div>
                    <div>
                      <div className="text-sm">
                        {typeof link.link === "string" &&
                          link.link.replace(
                            "http://116.202.210.102:3030/resumes/65d87d0e840d38f93d41709a-",
                            ""
                          )}
                      </div>
                      <div className="text-sm font-light opacity-95">
                        Last Updated:{" "}
                        {moment(link.updatedAt).format("MMMM DD, YYYY hh:mm A")}
                      </div>
                    </div>
                  </div>{" "}
                  <div className="h-fit max-w-sm flex gap-2">
                    <ModalComponent link={link.link} />
                    <DownloadIcon
                    className="mt-2"
                      onClick={() => handleDownloadPdf(link.link)}
                    />
                    <Button >Edit</Button>
                  </div>
                </div>
              </div>
            ))}
        </Stack>
      </div>
    </Stack>
  );
};

export default Library;
