import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut } from './operations';

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
        state.user = action.payload.data;
        // state.token = action.payload.data.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        console.log(action);
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logIn.rejected, (state, action) => {
        console.log(action.payload);
        state.error = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      });
    // .addCase(refreshUser.pending, (state) => {
    //   state.isRefresh = true;
    // })
    // .addCase(refreshUser.fulfilled, (state, action) => {
    //   state.user = action.payload;
    //   state.isLoggedIn = true;
    //   state.isRefresh = false;
    //   state.error = null;
    // })
    // .addCase(refreshUser.rejected, (state, action) => {
    //   state.isRefresh = false;
    //   state.error = action.payload;
    // });
  },
});

export const authReducer = authSlice.reducer;
