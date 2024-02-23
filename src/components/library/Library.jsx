import { useState, useEffect } from "react";
import ApiFetching from "../../services/ApiFetching";
import { useDispatch, useSelector } from "react-redux";
import { setCvData } from "../../redux/slices/CvSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const Library = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.CvSlice.getCvData);
  const [pdfLink, setPdfLink] = useState(null);
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleViewPdf = async (link) => {
    try {
      setPdfLink(link);
    } catch (error) {
      console.log(error, "afsasd");
    }
  };

  const handleDownloadPdf = (link) => {
    const anchor = document.createElement("a");
    anchor.href = link;
    anchor.setAttribute("download", "CV.pdf");

    document.body.appendChild(anchor);
    anchor.click();

    document.body.removeChild(anchor);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await ApiFetching("GET", "user/get", null);
        const data = response.data;
        console.log(data);
        if (data.success === true) {
          console.log(response.data);
          dispatch(setCvData(data.user));
        }
      } catch (error) {
        console.log(error, "afsasd");
      }
    };
    getData();
  }, []);

  return (
    <>
      <div className="w-full font-poppins bg-slate-200 h-fit shadow-sm rounded-md flex flex-col">
        <div className="flex p-4 gap-2 w-full justify-between border-2 border-slate-100 rounded-sm">
          <div className="text-lg font-semibold">
            Name:{data && data.fullname}
          </div>
          <div className="text-lg font-semibold ">
            {" "}
            Email:{data && data.email}
          </div>
          <div className="text-lg font-semibold">
            Mobile No :{data && data.mobile}
          </div>
        </div>
        <div>
          <Stack className="border-2 p-4 text-lg rounded-sm gap-2">
            {data &&
              data.cvLink &&
              data.cvLink.map((link, index) => (
                <>
                  <div
                    className="flex flex-col gap-1 w-full border-2 border-gray-400 p-2 rounded-md"
                    key={index}>
                    <div className="flex font-medium  justify-between">
                      <div className="flex gap-2 leading-0">
                        <div> {index + 1}.</div> <div>{link}</div>{" "}
                      </div>{" "}
                      <div className="h-fit flex gap-2">
                        <Button variant="contained">
                          <VisibilityIcon onClick={() => handleViewPdf(link)} />
                        </Button>
                        <Button variant="contained">
                          <DownloadIcon
                            onClick={() => handleDownloadPdf(link)}
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </Stack>
        </div>
        <div className="relative">
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <Document file={pdfLink} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.apply(null, Array(numPages))
              .map((x, i) => i + 1)
              .map((page, i) => {
                return (
                  <Stack key={i}>
                    <Page
                      pageNumber={page}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </Stack>
                );
              })}
          </Document>
        </div>
      </div>
    </>
  );
};

export default Library;
