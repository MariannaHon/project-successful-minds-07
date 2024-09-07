import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

axios.defaults.baseURL = 'https://successful-minds-db.onrender.com/';

export const fetchUser = createAsyncThunk(
  'users/',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/users/${id}`);
      setAuthHeader(response.data.accessToken);
      return response.data;   
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/',
  async ({ id, avatarUrl, gender, name, email, password }, thunkAPI) => {
    try {
      const response = await axios.patch(`/users/${id}`, {
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
  '/users/avatar',
  async ({id, avatarUrl},thunkAPI) => {
    try {
    const response = await axios.patch(`/users/${id}`, {avatarUrl});
    setAuthHeader(response.data.accessToken);
    return response.data;
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error.message);
  }
}
);