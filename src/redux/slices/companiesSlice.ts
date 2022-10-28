import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Company } from "../../shared/companies/types";
import axios from "axios";

type CompaniesState = {
  companies: Company[];
  loading: boolean;
  error: string | undefined;
  selectedCompanies: number[];
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

export const deleteCompany = createAsyncThunk<
  number,
  { url: string; id: number },
  { rejectValue: string }
>("companies/deleteCompany", async (urlParam, { rejectWithValue }) => {
  try {
    const { url, id } = urlParam;
    const result = await axios.delete(`${url}/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(String(error));
  }
});

export const addCompany = createAsyncThunk<
  Company,
  { url: string; item: Company },
  { rejectValue: string }
>("Companies/addCompany", async (urlParam, { rejectWithValue }) => {
  try {
    const { url, item } = urlParam;
    const { data } = await axios.post(`${url}`, item);
    return data;
  } catch (error) {
    return rejectWithValue(String(error));
  }
});

const initialState: CompaniesState = {
  companies: [],
  loading: false,
  error: undefined,
  selectedCompanies: [],
};

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    setSelectedCompanies(state, action) {
      state.selectedCompanies = action.payload;
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
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.companies = state.companies.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(addCompany.fulfilled, (state, action) => {
        state.companies = [...state.companies, action.payload];
      });
  },
});

export const { setSelectedCompanies } = companiesSlice.actions;
export default companiesSlice.reducer;
