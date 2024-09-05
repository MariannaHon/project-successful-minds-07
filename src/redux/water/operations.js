
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// GET @ /userwaterday
export const userWaterDay = createAsyncThunk(
    "waters/userwaterday",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get("/waters/userwaterday");
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// POST @ /waters
export const addWaterUser = createAsyncThunk(
    "waters/addWater",
    async (water, thunkAPI) => {
        try {
            const response = await axios.post("/waters", water);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

// DELETE @ /waters/:id
export const deleteWater = createAsyncThunk(
    "waters/deleteWaters",
    async (waterId, thunkAPI) => {
        try {
            const response = await axios.delete(`/waters/${waterId}`);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

// DELETE @ /waters/:id
export const editWater = createAsyncThunk(
    "waters/editWater",
    async ({ id, ...data }, thunkAPI) => {
        try {
            const response = await axios.patch(`/waters/${id}`, data);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
// get @ /waters/userwatermonth/:year/:month
export const waterMonthUser = createAsyncThunk(
    "waters/waterMonthUser",
    async ({ year, month }, thunkAPI) => {
        try {
            const response = await axios.get(
                `/waters/userwatermonth/${year}/${month}`
            );
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

