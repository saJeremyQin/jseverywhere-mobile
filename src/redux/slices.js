import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    email: null,
    userName: null,
    userToken: null
}

const authSlice = createSlice({
    name:'userAuth',
    initialState,
    reducers: {
        setSignIn: (state, action) => {
            // here, only handle with isLoggedIn & webToken
            state.isLoggedIn = action.payload.isLoggedIn;
            state.userToken = action.payload.userToken;
        },
        setSignUp: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.userToken = action.payload.userToken;
        },
        setSignOut: (state, action) => {
            state.isLoggedIn = false;
            state.email = null;
            state.userName = null;
            state.userToken = null;
    
        },
        setUserInfo: (state, action) => {
            state.userName = action.payload.userName;           
        }
    }
});

export const { setSignIn, setSignUp, setSignOut, setUserInfo } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.userAuth.isLoggedIn;
export const selectEmail = (state) => state.userAuth.email;
export const selectUserName = (state) => state.userAuth.userName;
export const selectUserToken = (state) => state.userAuth.userToken;

export default authSlice.reducer;