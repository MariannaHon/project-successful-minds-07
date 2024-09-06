import { createSlice } from '@reduxjs/toolkit';
import { fetchUser, updateUser, changeAvatar } from './operations';

const initialState = {
  user: {
    avatarUrl: '',
    name: '',
    email: '',
    password: '',
  },
};

export const userSlice = createSlice({
  name: 'updateUser',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload.data;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(changeAvatar.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload.data;
        state.error = null;
      })
      .addCase(changeAvatar.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload.data;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
