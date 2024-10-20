import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    rfidData: {},
    pageIndex: 1,
}
const rfidSlice = createSlice({
    name: "rfid",
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

export const {getRfid, nextPage,previousPage,resetPage,totalPage} = rfidSlice.actions
export default rfidSlice.reducer