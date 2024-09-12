
import axios from 'axios';
// import { toast } from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { formatDateForAddOrEditWater } from '../../helpers/formatDateForAddOrEditWater.js';


export const fetchWaterPerDay = createAsyncThunk(
  'waterPerDay/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/water/today`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchWaterPerMonth = createAsyncThunk(
  'water/fetchWaterPerMonth',
  async (monthReqParams, thunkAPI) => {
    try {
      const { month, year } = monthReqParams;
      const formattedMonth = String(month).padStart(2, '0');
      const formattedYear = String(year);
      const response = await axios.get(`/water/month`, {
        params: { month: formattedMonth, year: formattedYear }
      });

      if (!Array.isArray(response.data.data)) return;

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



export const deleteWater = createAsyncThunk('water/delete', async (id, thunkAPI) => {
  try {
    const response = await axios.delete(`/water/${id}`);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addWater = createAsyncThunk(
  'water/add',
  async ({ localTime: time, waterValue: amount }, thunkAPI) => {

    try {
      const response = await axios.post('/water', {
        time,
        amount,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changeWater = createAsyncThunk(
  'water/change',
  async ({ localTime: time, _id, waterValue: amount }, thunkAPI) => {

    try {
      const response = await axios.patch(`/water/${_id}`, {
        time,
        amount,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);