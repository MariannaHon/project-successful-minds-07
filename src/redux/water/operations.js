
import axios from 'axios';
// import { toast } from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { formatDateForAddOrEditWater } from '../../helpers/formatDateForAddOrEditWater.js';
import moment from "moment";

export const fetchWaterPerDay = createAsyncThunk(
  'water/fetchWaterPerDay',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/water/today`);

      if (!Array.isArray(response.data)) return;

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const fetchWaterPerMonth = createAsyncThunk(
//   'water/fetchWaterPerMonth',
//   async (monthReqParams, thunkAPI) => {
//     try {
//       const monthReqSearchParams = new URLSearchParams(monthReqParams)
//       const response = await axios.get(`/water/month?${monthReqSearchParams.toString()}`);

//       if (!Array.isArray(response.data.data)) return;

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

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

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



export const deleteWater = createAsyncThunk('water/delete', async (id, thunkAPI) => {
  try {
    const response = await axios.delete(`/water/remove/${id}`);

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
  async ({ localDate, localTime: time, _id, waterValue: amount }, thunkAPI) => {
    const date = formatDateForAddOrEditWater(localDate);

    try {
      const response = await axios.patch(`/water/edit/${_id}`, {
        date,
        time,
        amount,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

