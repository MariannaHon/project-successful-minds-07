
import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  logInUser,
  logOutUser,
  refreshUser,
  updateAvatarUser,
  updateInfoUser,
  updatDailiNormaUser,
} from "./operations";

const initialState = {
  user: {
    username: "",
    email: "",
    avatarURL: "",
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const handlePending = (state) => {
  state.isRefreshing = true;
};

const handleRejected = (state, action) => {
  state.isRefreshing = false;
  state.isLoggedIn = false;
  state.error = action.payload;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(registerUser.rejected, handleRejected)

      .addCase(logInUser.pending, handlePending)
      .addCase(logInUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(logInUser.rejected, handleRejected)

      .addCase(logOutUser.pending, handlePending)
      .addCase(logOutUser.fulfilled, (state) => {
        state.user = {};
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      })
      .addCase(logOutUser.rejected, handleRejected)

      .addCase(refreshUser.pending, handlePending)
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, handleRejected)

      .addCase(updateAvatarUser.pending, handlePending)
      .addCase(updateAvatarUser.fulfilled, (state, action) => {
        state.user.avatarURL = action.payload.avatarURL;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(updateAvatarUser.rejected, handleRejected)

      .addCase(updateInfoUser.pending, handlePending)
      .addCase(updateInfoUser.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload.result };
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(updateInfoUser.rejected, handleRejected)

      .addCase(updatDailiNormaUser.pending, handlePending)
      .addCase(updatDailiNormaUser.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(updatDailiNormaUser.rejected, handleRejected);
  },
});

export const authReducer = authSlice.reducer;
