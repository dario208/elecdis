import { createSlice } from "@reduxjs/toolkit";

const today = new Date(); 
const formattedDate = today.toISOString().split('T')[0];

const initialState = {
    sessionDateState : formattedDate
}

const chartSessionSlice = createSlice({
    name : "sessionDate",
    initialState,
    reducers : {
        handleChageDate : (state, action) => {
            state.sessionDateState = action.payload
        }
    }
})

export const { handleChageDate } = chartSessionSlice.actions;
export default chartSessionSlice.reducer