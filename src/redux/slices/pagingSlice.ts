import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Paging } from "../../shared/companies/types";
import axios from "axios";

type PagingState = {
  total: number;
  error: string | undefined;
};

export const fetchTotal = createAsyncThunk<
  Paging,
  { url: string },
  { rejectValue: string }
>("employees/fetchTotal", async (urlParam, { rejectWithValue }) => {
  try {
    const { url } = urlParam;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    return rejectWithValue;
  }
});

export const setTotal = createAsyncThunk<
  number,
  { url: string; value: { total: number } },
  { rejectValue: string }
>("employees/setTotal", async (urlParam, { rejectWithValue }) => {
  try {
    const { url, value } = urlParam;
    const result = await axios.patch(url, value);
    return value.total;
  } catch (error) {
    return rejectWithValue(String(error));
  }
});

const initialState: PagingState = {
  total: 0,
  error: undefined,
};

const pagingSlice = createSlice({
  name: "paging",
  initialState,
  reducers: {
    getTotal(state, action) {
      state.total = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotal.fulfilled, (state, action) => {
        state.total = action.payload.total;
        state.error = undefined;
      })
      .addCase(fetchTotal.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(setTotal.fulfilled, (state, action) => {
        state.total = action.payload;
        state.error = undefined;
      })
      .addCase(setTotal.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { getTotal } = pagingSlice.actions;
export default pagingSlice.reducer;
