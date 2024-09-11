import { useState } from 'react';
import { Helmet } from "react-helmet-async";
import css from "./HomePage.module.css";

import DailyNorma from "../../components/DailyNorma/DailyNorma";
import TodayWaterList from '../../components/TodayWaterList/TodayWaterList.jsx';
import MonthInfo from '../../components/MonthInfo/MonthInfo.jsx';

import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel";
import { nanoid } from '@reduxjs/toolkit';


const HomePage = () => {

  const [waterItems, setWaterItems] = useState([
    {
      _id: nanoid(),
      amount: 340,
      date: new Date().toISOString(),
    },
  ]);

  const handleAddWater = (newWater) => {
    setWaterItems([newWater, ...waterItems]); // Додаємо нову воду до початку списку
  };


  return (
    <>
      <Helmet>
        <title>Home page</title>
      </Helmet>
      <div className={css.homePage}>
        <DailyNorma className={css.norma} />
        <div className={css.leftColumn}>
          <WaterRatioPanel handleAddWater={handleAddWater} />
        </div>
        <div className={css.rightColumn}>
          <TodayWaterList waterItems={waterItems} setWaterItems={setWaterItems} handleAddWater={handleAddWater} />
          <MonthInfo /> 
        </div>
      </div>
    </>
  );
};

export default HomePage;






import axios from 'axios';
// import { toast } from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { formatDateForAddOrEditWater } from '../../helpers/formatDateForAddOrEditWater.js';


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
  'waterPerMonth/fetch',
  async ({ year, month }, thunkAPI) => {
    try {
      const response = await axios.get(`/water/month/${year}/${month}`);

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