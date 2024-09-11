import { authReducer } from './auth/slice';
import { modalReducer } from './modal/modalSlice';
import { userReducer } from './user/slice';
import { waterReducer } from './water/slice';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const AuthPersistConfig = {
  key: 'token',
  storage,
  whitelist: ['token'],
};

const persistedAuthReducer = persistReducer(AuthPersistConfig, authReducer);
const persistedWaterReducer = persistReducer(AuthPersistConfig, waterReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    water: persistedWaterReducer,
    modal: modalReducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
