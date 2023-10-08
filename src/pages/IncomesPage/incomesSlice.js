import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../config/Api";
import { findIndex } from "lodash";

export const getAllIncomes = createAsyncThunk(
  "incomes/getAll",
  async (body = {}) => {
    const response = await Api.get("/inputitem");
    return response.data;
  }
);

export const createIncome = createAsyncThunk("incomes/create", async (body) => {
  const response = await Api.post("/inputitem", body);
  return response.data;
});

export const updateIncome = createAsyncThunk("incomes/update", async (body) => {
  const response = await Api.put(`/inputitem/${body?.id}`, body);
  return response.data;
});

export const deleteIncome = createAsyncThunk("incomes/delete", async (body) => {
  const response = await Api.delete(`/inputitem/${body?.id}`);
  return response.data;
});

const incomesSlice = createSlice({
  name: "incomes",
  initialState: {
    incomes: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      ///------------ GET Incomes ------------------/////
      .addCase(getAllIncomes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllIncomes.fulfilled, (state, action) => {
        state.loading = false;
        state.incomes = action.payload?.content;
      })
      .addCase(getAllIncomes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ CREATE Incomes ------------------/////
      .addCase(createIncome.pending, (state) => {
        state.loading = true;
      })
      .addCase(createIncome.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.incomes = [...state.incomes, payload];
        console.log(state.incomes);
        console.log(payload);
      })
      .addCase(createIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ delete Incomes ------------------/////
      .addCase(deleteIncome.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteIncome.fulfilled, (state, { payload }) => {
        state.loading = false;
        const ctgIndex = findIndex(state.incomes, { id: payload?.id });
        state.incomes.splice(ctgIndex, 1);
      })
      .addCase(deleteIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ UPDATE Incomes ------------------/////
      .addCase(updateIncome.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateIncome.fulfilled, (state, { payload }) => {
        state.loading = false;
        const ctgIndex = findIndex(state.incomes, { id: payload?.id });
        payload.itemCount = state.incomes[ctgIndex]?.itemCount;
        state.incomes[ctgIndex] = payload;
      })
      .addCase(updateIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = incomesSlice.actions;

export default incomesSlice.reducer;
