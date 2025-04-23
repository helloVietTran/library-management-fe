import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const introspect = createAsyncThunk(
  "auth/introspect",
  async (_, thunkAPI) => {
    const token = Cookies.get("vbrary_jwt");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      // check token
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/introspect`,
        {
          accessToken: token,
        }
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    login: (state, action) => {
      const { accessToken, refreshToken } = action.payload;

      Cookies.set("vbrary_jwt", accessToken, { expires: 1 / 24 });
      Cookies.set("vbrary_refresh_token", refreshToken, { expires: 1 });

      state.isAuthenticated = true;
    },
    // Action logout: xóa state và cookie
    logout: (state) => {
      Cookies.remove("vbrary_jwt");
      Cookies.remove("vbrary_refresh_token");

      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(introspect.fulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(introspect.rejected, (state) => {
        state.isAuthenticated = false;
      });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
