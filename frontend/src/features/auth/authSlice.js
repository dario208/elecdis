import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const initialState = {
    isAuthenticated: !!Cookies.get('access_token'),
    userRole: Cookies.get('user') ? JSON.parse(Cookies.get('user')).role : "",
}
const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers: {
        login : (state, action) => {
            state.isAuthenticated = true;
            state.userRole = action.payload.user.role
            
        },
        logout : (state) => {
            state.isAuthenticated = false;
            state.userRole = "";
            Cookies.remove('access_token');
            Cookies.remove('user');
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;