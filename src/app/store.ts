import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './features/dataSlice';
import userReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
