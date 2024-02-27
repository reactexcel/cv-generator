import { createSlice } from "@reduxjs/toolkit";
const initialState={
    getCvData:[],
    getSingleUserData:[],
    isLoading:false,
    UserId:''
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
        },
        seUserId(state, action) {
            state.UserId = action.payload;
          },
    }
})
export const {setCvData,setSingleUserData,seUserId} = CvSlice.actions;
export default CvSlice.reducer;