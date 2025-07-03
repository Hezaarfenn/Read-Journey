import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

export const fetchBooks = createAsyncThunk(
  "books/fetchAll",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) {
        return thunkAPI.rejectWithValue("No token found");
      }

      setAuthHeader(token);

      const response = await axios.get("/books/recommend");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

const booksSlice = createSlice({
  name: "books",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    filter: {
      title: "",
      author: "",
    },
  },
  reducers: {
    setTitleFilter: (state, action) => {
      state.filter.title = action.payload;
    },
    setAuthorFilter: (state, action) => {
      state.filter.author = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.results;
      })
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setTitleFilter, setAuthorFilter } = booksSlice.actions;
export default booksSlice.reducer;
