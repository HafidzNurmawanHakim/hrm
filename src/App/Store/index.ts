import { configureStore } from "@reduxjs/toolkit";
import ScheduleSlice from "./reducers/ScheduleReducers/ScheduleSlice";

export const store = configureStore({
   reducer: {
      ScheduleSlice,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }).concat(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
