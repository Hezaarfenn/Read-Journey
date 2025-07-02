import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.baseURL = BASE_URL;

const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// Register
export const registerUser = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/signup", {
        name,
        email,
        password,
      });

      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        code: error.code,
        message: error.message,
      });
    }
  },
);

// Login
export const loginUser = createAsyncThunk(
  "auth/signin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/signin", {
        email,
        password,
      });

      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        code: error.code,
        message: error.message,
      });
    }
  },
);

// Logout
export const logoutUser = createAsyncThunk(
  "auth/signout",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      setAuthHeader(token);
      await axios.post("/users/signout");
      setAuthHeader(null);
    } catch (error) {
      return rejectWithValue({
        code: error.code,
        message: error.message,
      });
    }
  },
);

// Current user
export const fetchCurrentUser = createAsyncThunk(
  "auth/current",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      setAuthHeader(token);
      const response = await axios.get("/users/current");
      return response.data;
    } catch (error) {
      return rejectWithValue({
        code: error.code,
        message: error.message,
      });
    }
  },
);

//Refresh token
export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/users/current/refresh");
      return response.data;
    } catch (error) {
      return rejectWithValue({
        code: error.code,
        message: error.message,
      });
    }
  },
);
