import { createSlice } from '@reduxjs/toolkit';
import { register } from './operations';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      email: null,
      password: null,
    },
    token: '',
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
    loading: false,
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const authReducer = authSlice.reducer;

