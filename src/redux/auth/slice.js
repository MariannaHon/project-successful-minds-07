import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  logIn,
  logOut,
  refreshUser,
  forgotPassword,
} from './operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefresh: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload.data.user;
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logIn.rejected, (state, action) => {
        // console.log(action);
        state.error = action.payload;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        console.log('send');

        //  state.error = action.payload.msg;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error = action.payload.data.Message;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefresh = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        console.log(action.payload);

        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isRefresh = false;
        state.error = null;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        console.log(action.payload);
        state.isRefresh = false;
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
