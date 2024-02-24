import { Button, Stack, Typography } from "@mui/material";
import loginassets from "../../assets/loginassest.webp";
import { useFormik } from "formik";
import { SignInScheema } from "../../validation/validationScheema";
import ApiFetching from "../../services/ApiFetching";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { useEffect } from "react";
const SignIn = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit:async (values)=>{
     
        const response=await ApiFetching('POST','user/auth/signin',values)
        // console.log(response.response);
        if(response?.response?.status===404){
          toast.error(response?.response?.data?.message)
        }
        if(response.statusText==='OK' && response.status==200){
          const token=response.data?.accessToken;
          if(token){
            toast.success('Login SuccessFully')
            localStorage.setItem( "token", token)
          navigate('/home')
          }
        }
        // if(response)
      
    },
    validationSchema:SignInScheema
  })
  useEffect(()=>{
    const token=localStorage.getItem('token')
    if(token){
      navigate( '/home')
    }
  },[])
  return (
    <>
      {/* component */}
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
            <div className="w-full h-[380px] py-10 z-20 md:border md:backdrop-blur-sm rounded-lg md:shadow-md border-slate-300  mt-20">
              <Stack
                direction={"row"}
                spacing={1}
                sx={{ justifyContent: "center", alignItems: "center" }}>
                <LoginIcon />
                <div className="font-poppins text-2xl">
                  Login in your CV Library
                </div>
              </Stack>
              <form
                onSubmit={formik.handleSubmit}
                className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto ">
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
                      sx={{ textAlign: "left", pl: "7px" }}>
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
                      sx={{ textAlign: "left", pl: "7px" }}>
                      {formik.errors.password}
                    </Typography>
                  )}
                </div>
                <div className="mt-4">
                <Link to={"/signUp"} style={{ width: "100%", color: "blue" }}>
                    <Typography sx={{ textAlign: "right" }}>
                      Create New Account
                    </Typography>
                  </Link>
                  <Button variant="contained" type="submit" fullWidth>
                    Sign in
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

export default SignIn;
