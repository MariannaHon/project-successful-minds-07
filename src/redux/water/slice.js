
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchWaterPerDay,
  fetchWaterPerMonth,
  addWater,
  changeWater,
  deleteWater,
} from './operations';

const localDate = () => {
  const milliseconds = Date.now();
  const date = new Date(milliseconds);

  return date.toLocaleDateString();
};

function handleLoading(state) {
  state.loading = true;
  state.error = null;
}

function handleError(state, action) {
  state.loading = false;
  state.error = action.payload;
}

const waterSlice = createSlice({
  name: 'water',
  initialState: {
    waters: {
      waterPerMonth: [],
      waterPerDay: {
        waterRecord: [],
      },
    },
    loading: false,
    error: false,
    activeDay: localDate(),
    currentDate: Date.now(),
  },
  reducers: {
    setActiveDay(state, action) {
      state.activeDay = action.payload;
    },
    setCurrentDate(state, action) {
      state.currentDate = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchWaterPerDay.pending, handleLoading)
      .addCase(fetchWaterPerDay.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.waters.waterPerDay.waterRecord = action.payload;
      })
      .addCase(fetchWaterPerDay.rejected, handleError)
      .addCase(fetchWaterPerMonth.pending, handleLoading)
      .addCase(fetchWaterPerMonth.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.waters.waterPerMonth = action.payload;
      })
      .addCase(fetchWaterPerMonth.rejected, handleError)
      .addCase(deleteWater.pending, handleLoading)
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.waters.waterPerDay.waterRecord = state.waters.waterPerDay.waterRecord.filter(
          entry => entry._id !== action.payload._id
        );
        state.waters.waterPerMonth = state.waters.waterPerMonth.filter(
          entry => entry._id !== action.payload._id
        );
      })
      .addCase(deleteWater.rejected, handleError)
      .addCase(addWater.pending, handleLoading)
      .addCase(addWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;

        if (!state.waters.waterPerDay.waterRecord) {
          state.waters.waterPerDay.waterRecord = [];
        }

        state.waters.waterPerDay.waterRecord.push(action.payload);

        if (!state.waters.waterPerMonth) {
          state.waters.waterPerMonth = [];
        }

        state.waters.waterPerMonth.push(action.payload);
      })
      .addCase(addWater.rejected, handleError)
      .addCase(changeWater.pending, handleLoading)
      .addCase(changeWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;

        const updatedEntry = action.payload;
        const index = state.waters.waterPerDay.waterRecord.findIndex(
          entry => entry._id === updatedEntry._id
        );

        if (index !== -1) {
          state.waters.waterPerDay.waterRecord[index] = updatedEntry;
        }

        const indexMonth = state.waters.waterPerMonth.findIndex(
          entry => entry._id === updatedEntry._id
        );

        if (indexMonth !== -1) {
          state.waters.waterPerMonth[indexMonth] = updatedEntry;
        }
      })
      .addCase(changeWater.rejected, handleError),
});

export const waterReducer = waterSlice.reducer;
export const { setActiveDay, setCurrentDate } = waterSlice.actions;

