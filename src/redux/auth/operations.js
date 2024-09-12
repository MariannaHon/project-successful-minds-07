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
      const accessToken = response.data.data.accessToken;
      setAuthHeader(accessToken);
      localStorage.setItem('accessToken', accessToken);
      return response.data;
    } catch (error) {if (error.response) {
      const status = error.response.status;
      // console.log(error.response);
      const errorMessage =
        error.response.data.msg || 'Authorization failed';
      // console.log({ status } + '   and ' + { errorMessage });
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
      // console.log(error.response);
      const errorMessage =
        error.response.data.msg || 'Authorization failed';
      // console.log({ status } + '   and ' + { errorMessage });
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
    localStorage.removeItem('accessToken');
    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('accessToken');

    if (token === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(token);
      const res = await axios.get('/users/');
      const newAccessToken = res.data.data.accessToken;
      if (newAccessToken) {
        localStorage.setItem('accessToken', newAccessToken);
      }
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
      toast.success(`Reset password email was sent`);
      return response.data;
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        console.log(error.response.data.data.message);
        const errorMessage = error.response.data.data.message || 'No send';
        console.log({ status } + '   and ' + { errorMessage });
        toast.error(`Error ${status}: ${errorMessage}`, {
          position: 'top-center',
        });
        return thunkAPI.rejectWithValue(errorMessage);
      } else {
        toast.error('Something went wrong :( Try again later.');
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const updatePassword = createAsyncThunk(
  'auth/reset-password',
  async ({ password, token }, thunkAPI) => {
    try {
      

      const response = await axios.post('/auth/reset-password', {
        password,
        token,
      });
      setAuthHeader(response.data.accessToken);
      console.log(response.data);
      toast.success(`Reset password successfully`);
      return response.data;
    } catch (error) {
      toast.error('Something went wrong :( Try again later.');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// export const updatePassword = createAsyncThunk(
//   'auth/reset-password',
//   async ({ password, newPassword, token }, thunkAPI) => {
//     try {
//       if (password !== newPassword) {
//         toast.error("Passwords don't match");
//         return thunkAPI.rejectWithValue("Passwords don't match");
//       }
//       const response = await axios.post('/auth/reset-password', {
//         password,
//         newPassword,
//         token,
//       });
//       setAuthHeader(response.data.accessToken);
//       return response.data;
//     } catch (error) {
//       toast.error('Something went wrong :( Try again later.');
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );