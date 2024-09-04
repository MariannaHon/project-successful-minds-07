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
      setAuthHeader(response.data.token);
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
      const response = await axios.post(
        'auth/signin', { email, password }
      );
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
    setAuthHeader(response.data.token);
    console.log(response.data);

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
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// export const refreshUser = createAsyncThunk(
//   "auth/refresh",
//   async (_, thunkAPI) => {
//     const state = thunkAPI.getState();
//     const persistedToken = state.auth.token;

//     try {
//       setAuthHeader(persistedToken);
//       const res = await axios.get("/users/current");
//       return res.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   },
//   {
//     condition: (_, { getState }) => {
//       const state = getState();
//       const persistedToken = state.auth.token;

//       if (persistedToken === null) {
//         return false;
//       }

//       return true;
//     },
//     dispatchConditionRejection: true,
//   }
// );
