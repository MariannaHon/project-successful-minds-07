import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

axios.defaults.baseURL = 'https://successful-minds-db.onrender.com';
axios.defaults.withCredentials = true;

export const register = createAsyncThunk(
  'auth/register',
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post('/auth/signup', newUser);
      setAuthHeader(response.data.accessToken);
      return response.data;
    } catch (e) {
      toast.error('Something went wrong :( Try again later.');
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const signin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post('auth/signin', { email, password });
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      toast.error('Something went wrong :( Try again later.');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk('auth/signin', async (User, thunkAPI) => {
  try {
    const response = await axios.post('/auth/signin', User);
    setAuthHeader(response.data.data.accessToken);
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
    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    console.log(persistedToken);

    if (!persistedToken) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      const res = await axios.post('/auth/refresh', null, {
        withCredentials: true,
      });
      setAuthHeader(res.data.accessToken);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async ({ newPassword, confirmPassword, token }, thunkAPI) => {
    try {
      if (newPassword !== confirmPassword) {
        toast.error("Passwords don't match");
        return thunkAPI.rejectWithValue("Passwords don't match");
      }

      const response = await axios.patch('/auth/password', {
        newPassword,
        confirmPassword,
        token,
      });
      setAuthHeader(response.data.accessToken);
      return response.data;
    } catch (error) {
      toast.error('Something went wrong :( Try again later.');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
