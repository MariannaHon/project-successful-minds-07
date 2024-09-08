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
  async ({ id, avatarUrl, gender, name, email, password, waterRate }, thunkAPI) => {
    try {
      const userData = {
        id, // Додаємо userId
        avatarUrl,
        gender,
        name,
        email,
        password,
        waterRate, // Додаємо waterRate
      };

      console.log(userData);

      const response = await axios.patch(`/users/`, userData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const changeAvatar = createAsyncThunk(
  '/users/changeAvatar',
  async ({ id, avatarUrl }, thunkAPI) => {
    try {
      const response = await axios.patch(`/users/${id}`, { avatarUrl });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
