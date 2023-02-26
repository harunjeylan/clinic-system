import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const initialState = {
  token: null,
  refresh: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log(action.payload);
      const { access, refresh } = action.payload;
      state.token = access;
      state.refresh = refresh;

      // state.user = { ...state?.auth?.user, ...jwt_decode(access).user };
    },

    logOut: (state, action) => {
      state.token = null;
      state.refresh = null;
      state.user = null;
    },
    setUser: (state, action) => {
      const { access, refresh, user } = action.payload;
      state.token = access;
      state.refresh = refresh;
      state.user = user;
    },
    setUserData: (state, action) => {
      const { user } = action.payload;
      state.user = { ...state.user, ...user };
    },
  },
});

export const { setCredentials, logOut, setUser, setUserData } =
  authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentRefresh = (state) => state.auth.refresh;
