import { createSlice } from "@reduxjs/toolkit";
const initialState={
    getCvData:[],
    getSingleUserData:[]
}
const CvSlice=createSlice({
    name:'CvSlice',
    initialState,
    reducers:{
        setCvData(state,action){
            state.getCvData=action.payload;
        },
        setSingleUserData(state,action){
            state.getSingleUserData=action.payload;
        }
    }
})
export const {setCvData,setSingleUserData} = CvSlice.actions;
export default CvSlice.reducer;