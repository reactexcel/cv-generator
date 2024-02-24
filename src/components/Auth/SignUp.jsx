import React, { useEffect } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import ApiFetching from "../../services/ApiFetching";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { SignUpSchema } from "../../validation/validationScheema";
import loginassets from "../../assets/loginassest.webp";

const SignUp = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirm_password: "",
      mobile: "",
    },
    onSubmit: async (values) => {
      const response = await ApiFetching("POST", "user/auth/signup", values);

      if (response?.response?.status === 404) {
        toast.error(response?.response?.data?.message);
      }
      if (response?.response?.status === 409) {
        toast.error(response?.response?.data?.message);
      }

      if (response.statusText === "OK" && response.status === 200) {
        toast.success("SignUp successfully!");
        navigate("/");
      }
    },
    validationSchema: SignUpSchema,
  });

  return (
    <>
      <section className="min-h-screen flex flex-col items-stretch text-white">
        <img
          className="h-[100dvh] md:blur-sm blur-0 brightness-95 w-full"
          src={loginassets}
          alt=""
        />
        <div className="absolute backdrop-blur-sm w-full top-0 flex flex-col md:flex-row ">
          <div className="lg:flex hidden w-1/2 font-poppins bg-no-repeat bg-cover items-center">
            <div className="opacity-60 inset-0 z-0" />
            <div className="w-full px-24 z-10">
              <div className="md:text-3xl text-lg text-wrap text-white font-semibold my-4 p-24">
                Access your CV library and <br />
                manage your personal memories effortlessly.
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full h-screen md:h-fit flex items-center justify-center text-center md:px-16 px-0 z-0">
            <div className="absolute lg:hidden z-10 inset-0  bg-no-repeat bg-cover items-center">
              <div className="absolute opacity-60 inset-0 z-0" />
            </div>
            <div className="w-full h-auto py-10 z-20 md:border md:backdrop-blur-sm rounded-lg md:shadow-md border-slate-300  mt-20">
              <Stack
                direction={"row"}
                spacing={1}
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <LoginIcon />
                <div className="font-poppins text-2xl">SignUp</div>
              </Stack>
              <form
                onSubmit={formik.handleSubmit}
                className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto "
              >
                <Stack direction={"row"} spacing={2}>
                  <div className="pb-2 pt-4">
                    <input
                      type="text"
                      name="firstname"
                      placeholder="First Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstname}
                      className="block w-full p-3 text-lg rounded-md outline-none text-gray-700 font-poppins"
                    />
                    {formik.errors.firstname && formik.touched.firstname && (
                      <Typography
                        color="error"
                        sx={{ textAlign: "left", pl: "7px" }}
                      >
                        {formik.errors.firstname}
                      </Typography>
                    )}
                  </div>
                  <div className="pb-2 pt-4">
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Last Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastname}
                      className="block w-full p-3 text-lg rounded-md outline-none text-gray-700 font-poppins"
                    />
                    {formik.errors.lastname && formik.touched.lastname && (
                      <Typography
                        color="error"
                        sx={{ textAlign: "left", pl: "7px" }}
                      >
                        {formik.errors.lastname}
                      </Typography>
                    )}
                  </div>
                </Stack>
                <div className="pb-2 pt-4">
                  <input
                    type="text"
                    name="mobile"
                    placeholder="Phone No."
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mobile}
                    className="block w-full p-3 text-lg rounded-md outline-none text-gray-700 font-poppins"
                  />
                  {formik.errors.mobile && formik.touched.mobile && (
                    <Typography
                      color="error"
                      sx={{ textAlign: "left", pl: "7px" }}
                    >
                      {formik.errors.mobile}
                    </Typography>
                  )}
                </div>
                <div className="pb-2 pt-4">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="block w-full p-3 text-lg rounded-md outline-none text-gray-700 font-poppins"
                  />
                  {formik.errors.email && formik.touched.email && (
                    <Typography
                      color="error"
                      sx={{ textAlign: "left", pl: "7px" }}
                    >
                      {formik.errors.email}
                    </Typography>
                  )}
                </div>
                <div className="pb-2 pt-4">
                  <input
                    className="block w-full p-3 text-lg rounded-md outline-none text-gray-700 font-poppins"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <Typography
                      color="error"
                      sx={{ textAlign: "left", pl: "7px" }}
                    >
                      {formik.errors.password}
                    </Typography>
                  )}
                </div>
                <div className="pb-2 pt-4">
                  <input
                    className="block w-full p-3 text-lg rounded-md outline-none text-gray-700 font-poppins"
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    placeholder="Confirm Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirm_password}
                  />
                  {formik.errors.confirm_password &&
                    formik.touched.confirm_password && (
                      <Typography
                        color="error"
                        sx={{ textAlign: "left", pl: "7px" }}
                      >
                        {formik.errors.confirm_password}
                      </Typography>
                    )}
                </div>
                <div className="mt-4">
                  <Link to={"/"} style={{ width: "100%", color: "blue" }}>
                    <Typography sx={{ textAlign: "right" }}>
                      Already Have Account?
                    </Typography>
                  </Link>
                  <Button variant="contained" type="submit" fullWidth>
                    Sign Up
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
