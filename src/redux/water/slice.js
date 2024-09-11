
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

const initialState = {
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
  daysStats: [],
  selectedDay: null,
  hoveredDay: null,

  today: null,
  items: [],

  loading: false,
  error: false,
  activeDay: localDate(),
  currentDate: Date.now(),
  waters: {
    waterPerMonth: [],
    waterPerDay: {
      waterRecord: [],
    },
  },
}

const waterSlice = createSlice({
  name: 'water',
  initialState: initialState,
  reducers: {
    setActiveDay(state, action) {
      state.activeDay = action.payload;
    },
    setCurrentDate(state, action) {
      state.currentDate = action.payload;
    },
    prevMonth(state) {
      if (state.currentMonth === 0) {
        state.currentMonth = 11;
        state.currentYear -= 1;
      } else {
        state.currentMonth -= 1;
      }
      state.selectedDay = null;
    },
    nextMonth(state) {
      if (state.currentMonth === 11) {
        state.currentMonth = 0;
        state.currentYear += 1;
      } else {
        state.currentMonth += 1;
      }
      state.selectedDay = null;
    },
    hoverDayIndex(state, action) {
      state.hoveredDay = action.payload;
    },
    selectDay(state, action) {
      state.selectedDay = action.payload;
    },

    clearWater: () => initialState,
  },
  extraReducers: builder =>
    builder
      .addCase(fetchWaterPerDay.pending, handleLoading)
      .addCase(fetchWaterPerDay.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;

        // state.waters.waterPerDay.waterRecord = action.payload;

        state.today = action.payload;
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

        // state.waters.waterPerDay.waterRecord = state.waters.waterPerDay.waterRecord.filter(
        //   entry => entry._id !== action.payload._id
        // );
        // state.waters.waterPerMonth = state.waters.waterPerMonth.filter(
        //   entry => entry._id !== action.payload._id
        // );

        const index = state.today?.records.findIndex(
          (water) => String(water._id) === String(action.payload)
        );

        if (index !== -1) {
          state.today.records.splice(index, 1);
        }
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
export const { setActiveDay, setCurrentDate, prevMonth, nextMonth, hoverDayIndex, selectDay, clearWater } = waterSlice.actions;