import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const setAuthHeader = (token) => {
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// axios.defaults.baseURL = 'https://successful-minds-db.onrender.com/';
// axios.defaults.withCredentials = true;

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
      // setAuthHeader(response.data.accessToken);

      return response.data.user;        

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(

  'update/user',
  async ({ gender, name, email, password, waterRate }, thunkAPI) => {
    try {
      const response = await axios.patch('users', {
        gender,
        name,
        email,
        password,
        waterRate,
      });
      // setAuthHeader(response.data.accessToken);
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
    // setAuthHeader(response.data.accessToken);
    return response.data.avatar;
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error.message);

  }
}
);
