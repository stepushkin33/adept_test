import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Company } from "../../shared/companies/types";
import axios from "axios";

type CompaniesState = {
  companies: Company[];
  total: number;
  loading: boolean;
  error: string | undefined;
  selectedCompanies: number[];
  selectedEmployees: number[];
};

export const fetchCompanies = createAsyncThunk<
  Company[],
  { url: string; limit: number; page: number },
  { rejectValue: string }
>("companies/fetchCompanies", async (urlParam, { rejectWithValue }) => {
  try {
    const { url, limit, page } = urlParam;
    const { data } = await axios.get(`${url}?_limit=${limit}&_page=${page}`);
    return data;
  } catch (error) {
    return rejectWithValue;
  }
});

const initialState: CompaniesState = {
  companies: [],
  loading: false,
  error: undefined,
  total: 0,
  selectedCompanies: [],
  selectedEmployees: [],
};

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    setSelectedCompanies(state, action) {
      state.selectedCompanies = action.payload;
    },
    setSelectedEmployees(state, action) {
      state.selectedEmployees = action.payload;
    },
    addCompany(state, action) {
      state.companies = [...state.companies, action.payload];
      state.total++;
    },
    setCompanies(state, action) {
      state.companies = action.payload;
      state.total = action.payload.length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.companies = [...state.companies, ...action.payload];
        state.loading = false;
        state.error = undefined;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  setSelectedCompanies,
  setSelectedEmployees,
  addCompany,
  setCompanies,
} = companiesSlice.actions;
export default companiesSlice.reducer;
