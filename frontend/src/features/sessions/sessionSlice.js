import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    sessionData: {},
    pageIndex: 1,
}
const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        getSession: (state, action) => {
            state.sessionData = action.payload;
        },
        nextPage: (state, action) => {
            state.pageIndex = action.payload;
        }
        ,
        previousPage:(state,action)=>{
            state.pageIndex=action.payload;
        }
        ,
        resetPageSession:(state)=>{
            state.pageIndex=1
        }
        ,
        totalPage:(state,action)=>{
            state.pageIndex=action.payload
        }
    }

})

export const {getSession, nextPage,previousPage,resetPageSession,totalPage} = sessionSlice.actions
export default sessionSlice.reducer