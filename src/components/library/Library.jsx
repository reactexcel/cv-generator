import React, { useEffect, useState } from "react";
import ApiFetching from "../../services/ApiFetching";
import { useDispatch, useSelector } from "react-redux";
import { setCvData } from "../../redux/slices/CvSlice";

const Library = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const data = useSelector((state) => state.CvSlice.getCvData);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await ApiFetching("GET", "user/get", null);
        const responseData = response.data;
        if (responseData.success === true) {
          dispatch(setCvData(responseData.user));
        }
      } catch (error) {
        console.log(error, "afsasd");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{/* Your JSX to render the component */}</>;
};

export default Library;
