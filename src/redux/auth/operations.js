import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

axios.defaults.baseURL = 'https://successful-minds-db.onrender.com';

export const register = createAsyncThunk(
  'auth/register',
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post('/auth/signup', newUser);
      const accessToken = response.data.data.accessToken;
      setAuthHeader(accessToken);
      localStorage.setItem('accessToken', accessToken);
      return response.data;
    } catch (e) {
      toast.error('Something went wrong :( Try again later.');
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logIn = createAsyncThunk('auth/signin', async (User, thunkAPI) => {
  try {
    const response = await axios.post('/auth/signin', User);
    const accessToken = response.data.data.accessToken;
    setAuthHeader(accessToken);

    localStorage.setItem('accessToken', accessToken);
    return response.data;
  } catch (error) {
    toast.error('Something went wrong :( Try again later.');
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.get('/auth/logout');
    clearAuthHeader();
    localStorage.removeItem('accessToken');
    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {

    const token = localStorage.getItem('accessToken');

    // const state = thunkAPI.getState();
    // const persistedToken = state.auth.accessToken;

    // console.log(persistedToken);

    if (token === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(token);
      const res = await axios.post("/users");
      const newAccessToken = res.data.data.accessToken;
      if (newAccessToken) {
        localStorage.setItem('accessToken', newAccessToken);
      }
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
