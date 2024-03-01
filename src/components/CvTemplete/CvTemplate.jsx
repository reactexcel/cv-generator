import { Button, CircularProgress, Stack } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useRef, useState } from "react";
import ApiFetching from "../../services/ApiFetching";
import { useDispatch, useSelector } from "react-redux";
import { setSingleUserData } from "../../redux/slices/CvSlice";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Refereshing from "../Refereshing/Refereshing";
import moment from "moment";

const CvTemplate = () => {
  const [loading, setLoading] = useState(false);
  const userId = useParams();
  const dispatch = useDispatch();
  const [Btnloading, setBtnloading] = useState(false);

  const SingleUserData = useSelector(
    (state) => state.CvSlice.getSingleUserData
  );

  const componentRef = useRef();

  useEffect(() => {
    const getSingleUserData = async () => {
      setLoading(true);
      const getSingleData = await ApiFetching(
        "GET",
        `user/cv/fetch/${userId.cvTemplateId}`,
        null
      );
      if (getSingleData.status === 200) {
        console.log(getSingleData);
        dispatch(setSingleUserData(getSingleData.data.data));
      }
      setLoading(false);
    };
    getSingleUserData();
  }, []);

  const handleSave = async () => {
    const input = componentRef.current;

    const approximatePdfSize = 2500 * 3500;

    html2canvas(input, { scale: 2 }).then(async (canvas) => {
      let imgData = canvas.toDataURL("image/jpeg", 1.0);
      let pdf;
      let blob;
      let quality = 1.0;

      const calculatePdfSize = () => {
        pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: "a4",
        });
        const imgWidth = 600;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);

        blob = pdf.output("blob");
        return blob.size;
      };

      let size = calculatePdfSize();

      while (size > approximatePdfSize && quality > 0) {
        quality -= 0.05;
        imgData = canvas.toDataURL("image/jpeg", quality);
        size = calculatePdfSize();
      }
      const formData = new FormData();
      formData.append(
        "resume",
        blob,
        `${SingleUserData?.personalInfo?.firstName}.pdf`
      );
      formData.append("templetId", userId.cvTemplateId);
      setBtnloading(true);

      const res = await ApiFetching("POST", "user/upload", formData);
      if (res.status === 200) {
        toast.success("Your resume saved successfully");
      } else {
        toast.error("Something went wrong");
      }

      setBtnloading(false);
    });
  };

  if (loading) {
    return <Refereshing />;
  }

  return (
    <Stack width={{ sm: "100%", xs: "80%" }} m={"auto"}>
      <Stack
        className="border-1 shadow-lg shadow-gray-700 rounded-lg"
        id={"pdf"}
        ref={componentRef}>
        {/* top content */}
        <div className="flex rounded-t-lg bg-red-600 text-white sm:px-2 w-full">
          <div className="h-40 w-40 overflow-hidden sm:rounded-full sm:relative sm:p-0 top-10 left-5 p-3">
            <img src="https://images.app.goo.gl/KCP3CC2JTAnybUnx8" />
          </div>
          <div className="w-2/3 sm:text-center pl-5 mt-10 text-start">
            <p className="font-poppins font-bold text-heading sm:text-4xl text-2xl">
              {SingleUserData?.personalInfo?.firstName +
                " " +
                SingleUserData?.personalInfo?.lastName}
            </p>
          </div>
        </div>
        {/* main content */}
        <Stack className="p-5">
          <div className="flex flex-col sm:flex-row sm:mt-10">
            <div className="flex flex-col sm:w-1/3">
              {/* My contact */}
              <div className="py-3 sm:order-none order-3">
                <h2 className="text-lg font-poppins font-bold text-top-color">
                  My Contact
                </h2>
                <div className="border-2 w-20 border-top-color my-3" />
                <div>
                  <div className="flex items-center my-1">
                    <a className="w-6 text-gray-700 hover:text-orange-600">
                      {SingleUserData?.personalInfo?.links?.linkedin && (
                        <LinkedInIcon />
                      )}
                    </a>
                    <div className="ml-2 truncate">
                      {SingleUserData?.personalInfo?.links?.linkedin}
                    </div>
                  </div>
                  <div className="flex items-center my-1 gap-2">
                    <a
                      className="w-6 text-gray-700 hover:text-orange-600"
                      aria-label="Visit TrendyMinds YouTube"
                      href=""
                      target="_blank">
                      {SingleUserData?.personalInfo?.phone && (
                        <LocalPhoneIcon className="h-4" />
                      )}
                    </a>
                    <div>{SingleUserData?.personalInfo?.phone}</div>
                  </div>
                  <div className="flex items-center my-1">
                    <a
                      className="w-6 text-gray-700 hover:text-orange-600"
                      aria-label="Visit TrendyMinds Facebook"
                      href=""
                      target="_blank">
                      {SingleUserData?.personalInfo?.email && <EmailIcon />}
                    </a>
                    <div>{SingleUserData?.personalInfo?.email}</div>
                  </div>
                  <div className="flex items-center my-1 gap-2">
                    <a
                      className="w-6 text-gray-700 hover:text-orange-600"
                      aria-label="Visit TrendyMinds Twitter"
                      href=""
                      target="_blank">
                      {SingleUserData?.personalInfo?.links?.github && (
                        <GitHubIcon />
                      )}
                    </a>
                    <div>{SingleUserData?.personalInfo?.links?.github}</div>
                  </div>
                </div>
              </div>
              {/* Skills */}
              <div className="py-3 sm:order-none order-2">
                <h2 className="text-lg font-poppins font-bold text-top-color">
                  Skills
                </h2>
                <div className="border-2 w-20 border-top-color my-3" />
                <div>
                  {SingleUserData?.skills?.map((e, i) => {
                    return (
                      <div className="flex items-center my-1" key={i}>
                        <div className="ml-2">{e}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Education Background */}
              <div className="py-3 sm:order-none order-1">
                <h2 className="text-lg font-poppins font-bold text-top-color">
                  Education Background
                </h2>
                <div className="border-2 w-20 border-top-color my-3" />
                <div className="flex flex-col space-y-1">
                  {SingleUserData?.education?.map((e, i) => {
                    return (
                      <div key={i} className="flex flex-col">
                        <p className="font-semibold text-xs text-gray-700">
                          <p className="text-lg font-poppins">
                            {e.institution}
                          </p>
                          <div className="flex gap-10">
                            {" "}
                            <div> {e.startDate}</div>
                            <div>{e.endDate}</div>
                          </div>
                        </p>
                        <p className="text-sm font-medium">
                          <span className="text-green-700">
                            <div className="flex gap-2 ">
                              {" "}
                              <div className="text-base font-medium">
                                Courses
                              </div>
                              <div>{e.degree}</div>
                            </div>
                            <div>{e.fieldOfStudy}</div>
                          </span>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:w-2/3 order-first sm:order-none sm:-mt-10">
              {/* About me */}
              <div className="py-3">
                <h2 className="text-lg font-poppins font-bold text-top-color">
                  About Me
                </h2>
                <div className="border-2 w-20 border-top-color my-3" />
                <p>
                  To get a career opportunity which would help me to utilize my
                  academic background to assist me to gain experience, employ my
                  excellent skills, and enable me to make positive contribution.
                </p>
              </div>
              {/* Professional Experience */}
              <div className="py-3">
                <h2 className="text-lg font-poppins font-bold text-top-color">
                  Professional Experience
                </h2>
                <div className="border-2 w-20 border-top-color my-3" />
                <div className="flex flex-col">
                  {SingleUserData?.experience?.map((e, i) => {
                    return (
                      <div key={i} className="flex flex-col">
                        <p className="text-lg font-bold text-gray-700">
                          {e.company} | {e.position} | {e.startDate} |{" "}
                          {e.endDate}
                        </p>
                        <p className="font-semibold text-sm text-gray-700">
                          <div> </div>
                        </p>
                        <div className="text-wrap font-medium">
                          Achivements/Tasks : <span>{e.responsibilities}</span>
                        </div>
                        <br />
                        <div className="text-wrap font-medium">
                          Technologies work on: <span>{e.environments}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Projects */}
              <div className="py-3">
                <h2 className="text-lg font-poppins font-bold text-top-color">
                  Certificates
                </h2>
                <div className="border-2 w-20  my-3" />
                <div className="flex flex-col">
                  {SingleUserData?.certifications?.map((e, i) => {
                    return (
                      <div key={i} className="flex flex-col">
                        <p className="text-lg font-semibold text-gray-700">
                          {e.name}
                        </p>
                        <p className="font-normal text-md text-gray-700 mb-1 pl-2">
                          <div> {e.organization}</div>
                          <div>{e.date}</div>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        spacing={2}
        sx={{ justifyContent: "center", alignItems: "center", mt: "10px" }}>
        <Button onClick={handleSave} variant="contained">
          {Btnloading ? (
            <CircularProgress sx={{ color: "inherit" }} />
          ) : (
            "Upload"
          )}
        </Button>
      </Stack>
    </Stack>
  );
};

export default CvTemplate;
