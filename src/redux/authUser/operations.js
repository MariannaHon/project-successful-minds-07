// import axios from "axios";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";

// axios.defaults.baseURL = "https://backend-water-tracker.onrender.com/api";

// const setAuthHeader = (token) => {
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// const clearAuthHeader = () => {
//   axios.defaults.headers.common.Authorization = "";
// };

// /*
//  * POST @ /auth/signup
//  * body: { username, email, password }
//  */
// export const registerUser = createAsyncThunk(
//   "auth/register",
//   async (credentials, thunkAPI) => {
//     try {
//       const res = await axios.post("/auth/signup", credentials);
//       toast.success("Registration completed successfully");
//       return res.data;
//     } catch (error) {
//       toast.error(`Email is already in use`);
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// /*
//  * POST @ /auth/signinn
//  * body: { email, password }
//  */
// export const logInUser = createAsyncThunk(
//   "auth/login",
//   async (credentials, thunkAPI) => {
//     try {
//       const res = await axios.post("/auth/signin", credentials);

//       setAuthHeader(res.data.token);
//       return res.data;
//     } catch (error) {
//       toast.error(`Incorrect email or password`);
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// /*
//  * POST @ /auth/logout
//  * headers: Authorization: Bearer token
//  */
// export const logOutUser = createAsyncThunk(
//   "auth/logout",
//   async (_, thunkAPI) => {
//     try {
//       await axios.post("/auth/logout");
//       clearAuthHeader();
//     } catch (error) {
//       toast.error(error.response.data.message);
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// /*
//  * GET @ /users/current
//  * headers: Authorization: Bearer token
//  */
// export const refreshUser = createAsyncThunk(
//   "auth/refresh",
//   async (_, thunkAPI) => {
//     const state = thunkAPI.getState();
//     const persistedToken = state.auth.token;

//     if (persistedToken === null) {
//       return thunkAPI.rejectWithValue("Unable to fetch user");
//     }

//     try {
//       setAuthHeader(persistedToken);
//       const res = await axios.get("/users/current");
//       return res.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// /*
//  * patch @ /users/avatars
//  * body: { }
//  */
// export const updateAvatarUser = createAsyncThunk(
//   "users/avatars",
//   async (credentials, thunkAPI) => {
//     try {
//       const res = await axios.patch("/users/avatars", credentials);

//       return res.data;
//     } catch (error) {
//       toast.error(error.response.data.message);
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// /*
//  * patch @ /users/avatars
//  * body: { }
//  */

// export const updateInfoUser = createAsyncThunk(
//   "users/update",
//   async (credentials, thunkAPI) => {
//     try {
//       const res = await axios.patch("/users/update", credentials);

//       return res.data;
//     } catch (error) {
//       toast.error(error.response.data.message);
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const updatDailiNormaUser = createAsyncThunk(
//   "users/updateDaliNorma",
//   async (credentials, thunkAPI) => {
//     try {
//       const res = await axios.patch("/users/dailynorm", credentials);

//       return res.data;
//     } catch (error) {
//       toast.error(error.response.data.message);
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const forgotPasswordUser = createAsyncThunk(
//   "users/forgotPassword",
//   async (credentials, thunkAPI) => {
//     try {
//       const res = await axios.post("auth/change-password", credentials);
//       toast.success("Email sent successfully");
//       return res.data;
//     } catch (error) {
//       toast.error("Incorrect email");
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const updatePassworUser = createAsyncThunk(
//   "users/updatePasswor",
//   async (credentials, thunkAPI) => {
//     try {
//       const res = await axios.post("auth/reset-password", credentials);
//       toast.success("Update password successfully");
//       return res.data;
//     } catch (error) {
//       toast.error("Incorrect password");
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
