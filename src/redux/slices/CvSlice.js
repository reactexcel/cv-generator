import { createSlice } from "@reduxjs/toolkit";
const initialState={
    getCvData:[]
}
const CvSlice=createSlice({
    name:'CvSlice',
    initialState,
    reducers:{
        setCvData(state,action){
            state.getCvData=action.payload;
        }
    }
})
export const {setCvData} = CvSlice.actions;
export default CvSlice.reducer;