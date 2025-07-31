import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getStoredToken, setStoredToken } from "../../utils/authUtils";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.baseURL = BASE_URL;

export const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// Axios interceptor for automatic token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const storedToken = getStoredToken();
        if (!storedToken) {
          throw new Error("No token available");
        }

        const response = await axios.post(
          "/users/refresh",
          {},
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          },
        );

        const newToken = response.data.token;

        setStoredToken(newToken);
        setAuthHeader(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("persist:auth");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

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
  async (_, { getState }) => {
    const token = getState().auth.token;

    try {
      if (token) {
        setAuthHeader(token);
        await axios.post("/users/signout");
      }
      setAuthHeader(null);
    } catch (error) {
      console.warn("Logout endpoint failed, but clearing local state:", error);
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
      const response = await axios.post("/users/refresh");
      return response.data;
    } catch (error) {
      return rejectWithValue({
        code: error.code,
        message: error.message,
      });
    }
  },
);
