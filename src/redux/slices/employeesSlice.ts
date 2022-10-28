import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Employee } from "../../shared/companies/types";
import axios from "axios";
import { access } from "fs";

type EmployeesState = {
  employees: Employee[];
  loading: boolean;
  error: string | undefined;
  selectedEmployees: number[];
};

export const fetchEmployees = createAsyncThunk<
  Employee[],
  { url: string },
  { rejectValue: string }
>("employees/fetchEmployees", async (urlParam, { rejectWithValue }) => {
  try {
    const { url } = urlParam;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    return rejectWithValue;
  }
});

export const deleteEmployee = createAsyncThunk<
  number,
  { url: string; id: number },
  { rejectValue: string }
>("employees/deleteEmployee", async (urlParam, { rejectWithValue }) => {
  try {
    const { url, id } = urlParam;
    const result = await axios.delete(`${url}/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(String(error));
  }
});

export const addEmployee = createAsyncThunk<
  Employee,
  { url: string; item: Employee },
  { rejectValue: string }
>("employees/addEmployee", async (urlParam, { rejectWithValue }) => {
  try {
    const { url, item } = urlParam;
    const { data } = await axios.post(`${url}`, item);
    return data;
  } catch (error) {
    return rejectWithValue(String(error));
  }
});

const initialState: EmployeesState = {
  employees: [],
  loading: false,
  error: undefined,
  selectedEmployees: [],
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setSelectedEmployees(state, action) {
      state.selectedEmployees = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = [...state.employees, ...action.payload];
        state.loading = false;
        state.error = undefined;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees = [...state.employees, action.payload];
      });
  },
});

export const { setSelectedEmployees } = employeesSlice.actions;
export default employeesSlice.reducer;
