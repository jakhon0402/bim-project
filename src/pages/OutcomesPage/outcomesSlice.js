import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../config/Api";
import { findIndex } from "lodash";

export const getAllOutcomes = createAsyncThunk(
  "outcomes/getAll",
  async (body = {}) => {
    const response = await Api.get("/outputitem");
    return response.data;
  }
);

export const createOutcome = createAsyncThunk(
  "outcomes/create",
  async (body) => {
    const response = await Api.post("/outputitem", body);
    return response.data;
  }
);

export const updateOutcome = createAsyncThunk(
  "outcomes/update",
  async (body) => {
    const response = await Api.put(`/outputitem/${body?.id}`, body);
    return response.data;
  }
);

export const deleteOutcome = createAsyncThunk(
  "outcomes/delete",
  async (body) => {
    const response = await Api.delete(`/outputitem/${body?.id}`);
    return response.data;
  }
);

const outcomesSlice = createSlice({
  name: "outcomes",
  initialState: {
    outcomes: null,
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
      ///------------ GET outcomes ------------------/////
      .addCase(getAllOutcomes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOutcomes.fulfilled, (state, action) => {
        state.loading = false;
        state.outcomes = action.payload?.content;
      })
      .addCase(getAllOutcomes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ CREATE outcomes ------------------/////
      .addCase(createOutcome.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOutcome.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.outcomes = [...state.outcomes, payload];
        console.log(state.outcomes);
        console.log(payload);
      })
      .addCase(createOutcome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ delete outcomes ------------------/////
      .addCase(deleteOutcome.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOutcome.fulfilled, (state, { payload }) => {
        state.loading = false;
        const ctgIndex = findIndex(state.outcomes, { id: payload?.id });
        state.outcomes.splice(ctgIndex, 1);
      })
      .addCase(deleteOutcome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ UPDATE outcomes ------------------/////
      .addCase(updateOutcome.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOutcome.fulfilled, (state, { payload }) => {
        state.loading = false;
        const ctgIndex = findIndex(state.outcomes, { id: payload?.id });
        payload.itemCount = state.outcomes[ctgIndex]?.itemCount;
        state.outcomes[ctgIndex] = payload;
      })
      .addCase(updateOutcome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = outcomesSlice.actions;

export default outcomesSlice.reducer;
