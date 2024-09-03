import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


axios.defaults.baseURL = 'https://successful-minds-db.onrender.com/';

export const fetchUser = createAsyncThunk(
    'user/fetchAll',
    async (id, thunkAPI) => {      
        
        try {
            const response = await axios.get(`/users/${id}`);
            return response.data;  
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        
        }
    });

    export const updateUser = createAsyncThunk(
        "contacts/updateContact",
        async ({id, avatar, gender, name, email, password}, thunkAPI) => {
            try {
                const response = await axios.patch(`/users/${id}`, {avatar, gender, name, email, password});
                return response.data;
            } catch (error) {
                return thunkAPI.rejectWithValue(error.message);
                
            }
        }
    );