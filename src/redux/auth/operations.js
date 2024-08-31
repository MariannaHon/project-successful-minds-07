import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// const clearAuthHeader = () => {
//   axios.defaults.headers.common.Authorization = '';
// };

export const register = createAsyncThunk(
  'auth/register',
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post('/users/signup', newUser);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      toast.error('Something went wrong :( Try again later.');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

axios.defaults.baseURL = "http://successful-minds-db.onrender.com/";

// export const register = createAsyncThunk(
//   "auth/register",
//   async (credentials, thunkAPI) => {
//     try {
//       const res = await axios.post("/users/signup", credentials);
//       setAuthHeader(res.data.token);
//       return res.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const SignIn = createAsyncThunk(
  "auth/signin",
  async (User, thunkAPI) => {
    try {
      const response = await axios.post("/users/signin", User);
      setAuthHeader(response.data.token);
      console.log(response.data.token);
      
      return response.data;
    } catch (error) {
      toast.error('Something went wrong :( Try again later.');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
//   try {
//     await axios.post("/users/logout");
//     clearAuthHeader();
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

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
