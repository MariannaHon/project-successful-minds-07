
export const selectIsLoggedIn = state => state.user.isLoggedIn;

export const selectUser = state => state.user.userInfo;

export const selectIsRefreshing = state => state.user.isRefreshing;

export const selectAccessToken = state => state.user.accessToken;

export const selectRefreshToken = state => state.user.refreshToken;

export const selectUserError = state => state.user.error;

export const selectUserAvatar = state => state.user.userInfo.avatar;

export const selectWaterNorma = state => state.user?.userInfo?.waterNorma || 1.5;

export const selectWaterPerDay = state => state.water.waterPerDay;

export const selectWaterPerDayArr = state => state.water.waters.waterPerDay.waterRecord;

export const selectWaterPerMonth = state => state.water.waters.waterPerMonth;

export const selectActiveDay = state => state.water.activeDay;

export const selectCurrentDate = state => state.water?.currentDate || Date.now();

export const selectCountUsers = state => state.user.countUsers;

export const selectUsers = state => state.user.usersInfo;

// ==========================================

export const selectCurrentMonth = (state) => state.water.currentMonth;
export const selectCurrentYear = (state) => state.water.currentYear;
export const selectDaysStats = (state) => state.water.daysStats;
export const selectSelectedDay = (state) => state.water.selectedDay;
export const selectHoveredDay = (state) => state.water.hoveredDay;

// ==========================================

export const selectError = (state) => state.water.error;
export const selectLoading = (state) => state.water.loading;
export const selectWater = (state) => state.water.items;
export const selectWatersToday = (state) => state.water.today;