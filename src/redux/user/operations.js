import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUser = createAsyncThunk(
  'get/user',
  async ({ id, avatarUrl, gender, name, email, password,}, thunkAPI) => {
    try {
      const response = await axios.get('users', {
        id,
        avatarUrl,
        gender,
        name,
        email,
        password,
      });
      return response.data.user;        
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'update/user',
  async ({ gender, name, email, password }, thunkAPI) => {
    try {
      const response = await axios.patch('users', {       
        gender,
        name,
        email,
        password,
      });
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changeAvatar = createAsyncThunk(
  'update/avatar',
  async (formData,thunkAPI) => {
    try {
    const response = await axios.patch('users/avatar', formData);
    return response.data.avatar;
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error.message);

  }
}
);