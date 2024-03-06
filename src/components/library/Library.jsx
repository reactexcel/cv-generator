import { useState, useEffect } from "react";
import ApiFetching from "../../services/ApiFetching";
import { useDispatch, useSelector } from "react-redux";
import { setCvData } from "../../redux/slices/CvSlice";
import DownloadIcon from "@mui/icons-material/Download";
import { pdfjs } from "react-pdf";
import Stack from "@mui/material/Stack";
import ModalComponent from "./ModalComponent";
import moment from "moment";
import { Button, IconButton, TablePagination, Tooltip } from "@mui/material";
import Refereshing from "../Refereshing/Refereshing";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
const itemsPerPage = 10;
const Library = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.CvSlice.getCvData);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);

  const handleDownloadPdf = (link) => {
    const anchor = document.createElement("a");
    anchor.href = link;
    anchor.setAttribute("download", "CV.pdf");

    document.body.appendChild(anchor);
    anchor.click();

    document.body.removeChild(anchor);
  };

  const handleEdit = (link) => {
    navigate(`../editCvGenerator/${link.templetId}`);
  };

  const handleDeleteFile = async (id) => {
    const response = await ApiFetching("DELETE", `user/cv/delete/${id}`, null);
    if (response) {
      try {
        setLoading(true);
        const response = await ApiFetching("GET", "user/get", null);
        const data = response.data;
        if (data.success === true) {
          dispatch(setCvData(data.user));
          if (data.user.cvLink.length <= page * rowsPerPage) {
            setPage(page - 1);
          }
        }
      } catch (error) {
        console.log(error, "afsasd");
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const response = await ApiFetching("GET", "user/get", null);
        const data = response.data;
        if (data.success === true) {
          dispatch(setCvData(data.user));
        }
      } catch (error) {
        console.log(error, "afsasd");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return <Refereshing />;
  }

  return (
    <Stack
      sx={{
        wordBreak: "break-all",
        bgcolor: "#1B146412",
        width: "100%",
        m: "auto",
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
      }}
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
      <Stack spacing={2} sx={{ alignItems: "center", pb: "10px" }}>
        {data &&
          data.cvLink &&
          data.cvLink
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((link, index) => (
              <Stack
                sx={{ width: "96%", m: "auto" }}
                className="  border-2 border-gray-300  rounded-md "
                key={index}>
                <div className="flex font-medium w-full justify-between ">
                  <Stack
                    direction={{ md: "row", xs: "column" }}
                    sx={{
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                    }}>
                    <Stack direction={"row"} sx={{ alignItems: "center" }}>
                      <div className="px-2">
                        {" "}
                        {page * rowsPerPage + index + 1}.
                      </div>

                      <div className="text-sm">
                        {typeof link.link === "string" &&
                          link.link.replace(
                            `http://116.202.210.102:3030/resumes/${data._id}-`,
                            ""
                          )}
                      </div>
                    </Stack>

                    <Stack
                      direction={{ md: "row", xs: "column" }}
                      sx={{ alignItems: "center" }}>
                      <div className="text-xs  font-light opacity-95 ">
                        Uploaded at:{" "}
                        {moment(link.updatedAt).format("DD, MMMM hh:mm A")}
                      </div>
                      <Stack direction={"row"}>
                        <Tooltip title="View Pdf">
                          <IconButton>
                            <ModalComponent link={link.link} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Download">
                          <IconButton>
                            <DownloadIcon
                              className="mt-2"
                              color="primary"
                              onClick={() => handleDownloadPdf(link.link)}
                            />
                          </IconButton>
                        </Tooltip>
                        <Button
                          disabled={!link.templetId}
                          onClick={() => handleEdit(link)}>
                          <Tooltip title="Edit">
                            <IconButton>
                              <EditIcon
                                color={!link.templetId ? "error" : "secondary"}
                              />
                            </IconButton>
                          </Tooltip>
                        </Button>
                        <Button onClick={() => handleDeleteFile(link._id)}>
                          <Tooltip title="Delete">
                            <IconButton color="error">
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>{" "}
                </div>
              </Stack>
            ))}
      </Stack>
      <TablePagination
        component="div"
        count={data.cvLink ? data.cvLink.length : 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => handleChangeRowsPerPage(e)}
      />
    </Stack>
  );
};

export default Library;
