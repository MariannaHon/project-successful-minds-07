import { createSlice } from '@reduxjs/toolkit';
import { fetchUser, updateUser, changeAvatar } from './operations';


const initialState = {

  user: {
    gender: '',
    name: '',
    email: '',
    password: '',
  },
  avatar: {
    avatarUrl: '',
  },
  loading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'users',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.data;

        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(changeAvatar.fulfilled, (state, action) => {
        state.user = action.payload.data.avatar;

        state.error = null;
      })
      .addCase(changeAvatar.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {

        state.user = action.payload;

        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;

      })
  }
})

export const userReducer = userSlice.reducer;