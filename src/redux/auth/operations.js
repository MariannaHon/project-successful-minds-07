import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post(
        'https://successful-minds-db.onrender.com/auth/signup',
        newUser
      );
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      toast.error('Something went wrong :( Try again later.');
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
