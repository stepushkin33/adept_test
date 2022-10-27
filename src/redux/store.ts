import { configureStore } from "@reduxjs/toolkit";
import companiesReducer from "./slices/companiesSlice";

const store = configureStore({
  reducer: {
    companiesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
