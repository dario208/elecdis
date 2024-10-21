import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userData: {},
    pageIndex: 1,
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.userData = action.payload;
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

export const {getUser, nextPage,previousPage,resetPage,totalPage} = userSlice.actions
export default userSlice.reducer