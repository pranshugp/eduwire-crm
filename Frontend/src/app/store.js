import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import leadReducer from '../features/leadSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
     leads: leadReducer,
  },
});