import { configureStore } from "@reduxjs/toolkit";
import CvSlice from "./CvSlice";

export const store=configureStore({
    reducer:{
        CvSlice:CvSlice
    }
})