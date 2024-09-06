import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://successful-minds-db.onrender.com/';

export const fetchUser = createAsyncThunk(
  'users/fetchAll',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, avatarUrl, gender, name, email, password }, thunkAPI) => {
    try {
      const response = await axios.patch(`/users/${id}`, {
        avatarUrl,
        gender,
        name,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changeAvatar = createAsyncThunk(
  '/users/changeAvatar',
  async ({id, avatarUrl},thunkAPI) => {
    try {
    const response = await axios.patch(`/users/${id}`, {avatarUrl});
    return response.data;
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error.message);
  }
}
);