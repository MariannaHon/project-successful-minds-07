import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://successful-minds-db.onrender.com/';
axios.defaults.withCredentials = true;

export const fetchUser = createAsyncThunk(
  'users/fetchAll',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get('users/');
      setAuthHeader(response.data.accessToken);
      return response.data;        

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
  'update/user',
  async ({ gender, name, email, password }, thunkAPI) => {
    try {
      const response = await axios.patch('users', {       

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

  'update/avatar',
  async (formData,thunkAPI) => {
    try {
    const response = await axios.patch('users/avatar', formData);
    setAuthHeader(response.data.accessToken);
    return response.data;
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error.message);
  }
}
);
