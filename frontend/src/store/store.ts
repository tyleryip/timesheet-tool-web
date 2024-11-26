import { configureStore } from "@reduxjs/toolkit";
import timesheetReducer from "./slices/timesheetSlice";

export const store = configureStore({
    reducer: {
        timesheet: timesheetReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch