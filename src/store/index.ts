import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice';

export const store = configureStore({
    reducer: {
        employees: employeeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 