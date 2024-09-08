import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

axios.defaults.baseURL = 'https://successful-minds-db.onrender.com/';

export const fetchUser = createAsyncThunk(
  'get/user',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('get/user');
      setAuthHeader(response.data.accessToken);
      return response.data;        
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'update/user',
  async ({  avatarUrl, gender, name, email, password }, thunkAPI) => {
    try {
      const response = await axios.patch('update/user', {
        avatarUrl,
        gender,
        name,
        email,
        password,
      });
      setAuthHeader(response.data.accessToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changeAvatar = createAsyncThunk(
  'update/avatar',
  async ({avatarUrl},thunkAPI) => {
    try {
    const response = await axios.patch('update/avatar', {avatarUrl});
    setAuthHeader(response.data.accessToken);
    return response.data;
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error.message);
  }
}
);