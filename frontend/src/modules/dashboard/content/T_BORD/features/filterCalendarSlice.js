import { createSlice } from "@reduxjs/toolkit";

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0 donc on ajoute +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const initialState = {
    totalSession: formatDate(new Date()),
    energyDelivery: formatDate(new Date()),
    allRevenu: formatDate(new Date()),
    newUser: formatDate(new Date())
};

const filterDateSlice = createSlice({
    name : "filterCalendarDate",
    initialState,
    reducers : {
        filterDateForAllSession : (state, action) => {
            state.totalSession = action.payload
        },
        filterDateForEnergy : (state, action) => {
            state.energyDelivery = action.payload
        },
        filterDateForAllRevenu : (state, action) => {
            state.allRevenu = action.payload
        },
        filterDateForNewUser : (state, action) => {
            state.newUser = action.payload
        }
    }
})

export const { filterDateForAllRevenu, filterDateForAllSession, filterDateForEnergy, filterDateForNewUser } = filterDateSlice.actions;
export default filterDateSlice.reducer;