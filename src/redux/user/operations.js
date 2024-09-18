import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUser = createAsyncThunk(
  'get/user',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('users/');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'update/user',
  async ({ gender, name, email, oldPassword, password, waterRate }, thunkAPI) => {
    try {
      const response = await axios.patch('users', {
        gender,
        name,
        email,
        oldPassword,
        password,
        waterRate,
      });
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changeAvatar = createAsyncThunk(

  'update/avatar',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.patch('users/avatar', formData);
      return response.data.avatar;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.message);

    }
  }
);