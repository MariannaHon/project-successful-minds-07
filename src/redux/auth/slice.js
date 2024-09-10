import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  logIn,
  logOut,
  refreshUser,
  forgotPassword,
  //updatePassword

} from './operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefresh: false,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload.data.user;
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(logIn.pending, state => {
        state.loading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        console.log('send');
        state.user = action.payload.data.user;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error = action.payload.data.Message;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        localStorage.removeItem('accessToken');
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefresh = true;
        state.loading = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isRefresh = false;
        state.error = null;
        state.loading = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.token = null;
        state.isRefresh = false;
        state.error = action.payload;
        state.loading = false;
      })

      // ++++++++++++++++++++++++++++++++++++++++
      // .addCase(updatePassword.pending, state => {
      //   state.loading = true;
      // })
      // .addCase(updatePassword.fulfilled, (state, action) => {
       
      //   console.log('Password was successfully reset!');
      //   state.user = action.payload.data.user;
      //   state.error = null;
      //   state.loading = false;
      // })
      // .addCase(updatePassword.rejected, (state, action) => {
      //   state.error = action.payload;
      //   state.loading = false;
      // });
  },
});

export const authReducer = authSlice.reducer;
