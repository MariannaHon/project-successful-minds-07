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

export const logIn = createAsyncThunk('auth/signin', async (User, thunkAPI) => {
  try {
    const response = await axios.post('/auth/signin', User);
    const accessToken = response.data.data.accessToken;
    setAuthHeader(accessToken);
    localStorage.setItem('accessToken', accessToken);
    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      console.log(error.response);
      const errorMessage =
        error.response.data.message || 'Authorization failed';
      console.log({ status } + '   and ' + { errorMessage });
      toast.error(`Error ${status}: ${errorMessage}`, {
        position: 'top-center',
      });

      return thunkAPI.rejectWithValue(errorMessage);
    } else if (error.request) {
      toast.error('Network error: No response from server.', {
        position: 'top-center',
      });
      return thunkAPI.rejectWithValue('No response from server');
    } else {
      toast.error('Something went wrong :( Try again later.', {
        position: 'top-center',
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.get('/auth/logout');
    clearAuthHeader();
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

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.post('/auth/refresh');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const forgotPassword = createAsyncThunk(
  'auth/forgot-password',
  async (User, thunkAPI) => {
    try {
      const response = await axios.post('/auth/request-reset-email', User);
      // setAuthHeader(response.data.accessToken);
      toast.error('jfdhgdkgkmfn');
      return response.data;
    } catch (e) {
      toast.error('Something went wrong :( Try again later.');
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
