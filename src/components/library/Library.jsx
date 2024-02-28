import { useState, useEffect } from "react";
import ApiFetching from "../../services/ApiFetching";
import { useDispatch, useSelector } from "react-redux";
import { setCvData } from "../../redux/slices/CvSlice";
import DownloadIcon from "@mui/icons-material/Download";
import { pdfjs } from "react-pdf";
import Stack from "@mui/material/Stack";
import ModalComponent from "./ModalComponent";
import moment from "moment";
import { Button, IconButton, Tooltip } from "@mui/material";
import Refereshing from "../Refereshing/Refereshing";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const Library = () => {
  const navigate = useNavigate();
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
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        setloading(true);

        const response = await ApiFetching("GET", "user/get", null);
        const data = response.data;
        if (data.success === true) {
          dispatch(setCvData(data.user));
          setTitleName(data.user.cvLink);
        }
      } catch (error) {
        console.log(error, "afsasd");
      } finally {
        setloading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return <Refereshing />;
  }
  return (
    <Stack
      sx={{ wordBreak: "break-all", bgcolor: "#eeecf3" }}
      className="font-poppins  h-fit shadow-sm rounded-md flex flex-col">
      <Stack
        direction={{ md: "row", xs: "column" }}
        sx={{ justifyContent: "space-between", p: "30px" }}>
        <div className="md:text-lg text-sm  md:font-semibold font-medium">
          Name:{data && data.firstname + " " + data.lastname}
        </div>
        <div className="md:text-lg text-sm  md:font-semibold font-medium ">
          {" "}
          Email:{data && data.email}
        </div>
        <div className="ms:text-lg text-sm md:font-semibold font-medium">
          Mobile No :{data && data.mobile}
        </div>
      </Stack>
      <div>
        <Stack className="p-4 text-lg rounded-sm gap-2">
          {data &&
            data.cvLink &&
            data.cvLink.map((link, index) => (
              <div
                className="flex flex-col gap-1 w-full border-2 border-gray-300 p-2 rounded-md"
                key={index}>
                <div className="flex font-medium w-full justify-between">
                  <div className="flex flex-col md:flex-row gap-2  justify-between w-full leading-0">
                    <div className="flex mt-2 px-2">
                      <div className="text-sm font-medium"> {index + 1}.</div>
                      { console.log(link._id,'asdsad')}
                      <div className="text-sm">
                        { typeof link.link === "string" &&
                          link.link.replace(
                            `http://116.202.210.102:3030/resumes/${data._id}-`,
                            ""
                          )}
                      </div>
                    </div>

                    <div className="flex md:w-[40%] justify-between flex-col md:flex-row">
                      <div className="text-xs mt-3 font-light opacity-95">
                        Last Updated:{" "}
                        {moment(link.updatedAt).format("DD, MMMM hh:mm A")}
                      </div>
                      <div className="h-fit max-w-sm flex gap-2">
                        <Tooltip title="View Pdf">
                          <IconButton>
                            <ModalComponent link={link.link} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Download">
                          <IconButton>
                            <DownloadIcon
                              className="mt-2"
                              onClick={() => handleDownloadPdf(link.link)}
                            />
                          </IconButton>
                        </Tooltip>
                        <Button
                          disabled={!link.templetId}
                          onClick={() =>
                            navigate(`../editCvGenerator/${link.templetId}`)
                          }>
                          <Tooltip title="Edit">
                            <IconButton>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </Button>
                        <Button onClick={() => handleDeleteFile(link._id)}>
                          <Tooltip title="Delete">
                            <IconButton>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Button>
                      </div>
                    </div>
                  </div>{" "}
                </div>
              </div>
            ))}
        </Stack>
      </div>
    </Stack>
  );
};

export default Library;
