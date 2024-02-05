import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isAuthenticated: false,
    loading: false,
    user: null,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,    
    reducers: {
        LoadUserRequest(state) {
            state.loading = true;
        },
        LoadUserSuccess(state, action) {
            state.isAuthenticated = true;
            state.loading = false;
            state.user = action.payload;
        },
        LoadUserFail(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },

        clearErrors(state, action) {
            state.error = null;
        },



    } 
});


export const {LoadUserFail, LoadUserRequest, LoadUserSuccess, clearErrors} = userSlice.actions;

export default userSlice.reducer;