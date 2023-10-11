import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../config/Api";
import { findIndex } from "lodash";

export const getAllInventory = createAsyncThunk(
  "inventory/getAll",
  async (body = {}) => {
    const response = await Api.get("/inventory");
    return response.data;
  }
);

export const getAllInventoryByDateRange = createAsyncThunk(
  "inventory/getAllByDateRange",
  async (body) => {
    const response = await Api.get(
      `/inventory/find-by-date-range?startDate=${body?.startDate}&endDate=${body?.endDate}`
    );
    return response.data;
  }
);

export const createInventory = createAsyncThunk(
  "inventory/create",
  async (body) => {
    const response = await Api.post("/inventory", body);
    return response.data;
  }
);

export const updateInventory = createAsyncThunk(
  "inventory/update",
  async (body) => {
    const response = await Api.put(`/inventory/${body?.id}`, body);
    return response.data;
  }
);

export const deleteInventory = createAsyncThunk(
  "inventory/delete",
  async (body) => {
    const response = await Api.delete(`/inventory/${body?.id}`);
    return response.data;
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    inventory: null,
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
      ///------------ GET inventory ------------------/////
      .addCase(getAllInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.inventory = action.payload?.content;
      })
      .addCase(getAllInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAllInventoryByDateRange.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllInventoryByDateRange.fulfilled, (state, action) => {
        state.loading = false;
        state.inventory = action.payload;
      })
      .addCase(getAllInventoryByDateRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ CREATE inventory ------------------/////
      .addCase(createInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createInventory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.inventory = [...state.inventory, payload];
        console.log(state.inventory);
        console.log(payload);
      })
      .addCase(createInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ delete inventory ------------------/////
      .addCase(deleteInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteInventory.fulfilled, (state, { payload }) => {
        state.loading = false;
        const ctgIndex = findIndex(state.inventory, { id: payload?.id });
        state.inventory.splice(ctgIndex, 1);
      })
      .addCase(deleteInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///------------ UPDATE inventory ------------------/////
      .addCase(updateInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateInventory.fulfilled, (state, { payload }) => {
        state.loading = false;
        const ctgIndex = findIndex(state.inventory, { id: payload?.id });
        payload.itemCount = state.inventory[ctgIndex]?.itemCount;
        state.inventory[ctgIndex] = payload;
      })
      .addCase(updateInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = inventorySlice.actions;

export default inventorySlice.reducer;
