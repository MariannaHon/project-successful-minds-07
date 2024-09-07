import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

axios.defaults.baseURL = 'https://successful-minds-db.onrender.com/';

export const fetchUser = createAsyncThunk(
  '/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/');
      setAuthHeader(response.data.accessToken);
      return response.data;        
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  '/',
  async ({  avatarUrl, gender, name, email, password }, thunkAPI) => {
    try {
      const response = await axios.patch('/', {
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
  '/avatar',
  async ({avatarUrl},thunkAPI) => {
    try {
    const response = await axios.patch('/avatar', {avatarUrl});
    setAuthHeader(response.data.accessToken);
    return response.data;
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error.message);
  }
}
);