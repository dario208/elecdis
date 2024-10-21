import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clientData: {},
  pageIndex: 1,
};
const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    getClient: (state, action) => {
      state.clientData = action.payload;
    },
    nextPage: (state, action) => {
      state.pageIndex = action.payload;
    },
    previousPage: (state, action) => {
      state.pageIndex = action.payload;
    },
    resetPage: (state) => {
      state.pageIndex = 1;
    },
    totalPage: (state, action) => {
      state.pageIndex = action.payload;
    },
  },
});

export const { getClient, nextPage, previousPage, resetPage, totalPage } =
  clientSlice.actions;
export default clientSlice.reducer;
