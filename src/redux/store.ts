import { configureStore } from "@reduxjs/toolkit";
import companiesReducer from "./slices/companiesSlice";
import employeesReducer from "./slices/employeesSlice";
import pagingReducer from './slices/pagingSlice'

const store = configureStore({
  reducer: {
    companiesReducer,
    employeesReducer,
    pagingReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
