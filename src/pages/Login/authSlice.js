import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../config/Api";

export const login = createAsyncThunk("auth/login", async (body) => {
  const response = await Api.post("/account/authenticate", body);
  return response.data;
});

export const getCurrentUser = createAsyncThunk("auth/me", async (body) => {
  const response = await Api.get("/account/current-user");
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,
    loading: false,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      localStorage.setItem("token", payload?.token);
      state.isLoggedIn = true;
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [getCurrentUser.pending]: (state) => {
      state.loading = true;
    },
    [getCurrentUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    },
    [getCurrentUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { resetError, logout } = authSlice.actions;

export default authSlice.reducer;
