import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    rfidData: {},
    pageIndex: 1,
}
const rfidSpecificSlice = createSlice({
    name: "rfidSPecific",
    initialState,
    reducers: {
        getRfid: (state, action) => {
            state.rfidData = action.payload;
        },
        nextPage: (state, action) => {
            state.pageIndex = action.payload;
        }
        ,
        previousPage:(state,action)=>{
            state.pageIndex=action.payload;
        }
        ,
        resetPage:(state)=>{
            state.pageIndex=1
        }
        ,
        totalPage:(state,action)=>{
            state.pageIndex=action.payload
        }
    }

})

export const {getRfid, nextPage,previousPage,resetPage,totalPage} = rfidSpecificSlice.actions
export default rfidSpecificSlice.reducer