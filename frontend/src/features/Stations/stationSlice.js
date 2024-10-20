import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stationData: {},
  pageIndex: 1,
};
const stationSlice = createSlice({
  name: "station",
  initialState,
  reducers: {
    getStation: (state, action) => {
      state.stationData = action.payload;
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

export const { getStation, nextPage, previousPage, resetPage, totalPage } =
  stationSlice.actions;
export default stationSlice.reducer;
