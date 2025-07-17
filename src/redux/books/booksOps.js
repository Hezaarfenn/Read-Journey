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

const withAuth = async (thunkAPI, fn) => {
  const state = thunkAPI.getState();
  const token = state.auth.token;
  if (!token) return thunkAPI.rejectWithValue("No token found");

  setAuthHeader(token);
  return fn();
};

export const fetchRecommendedBooks = createAsyncThunk(
  "books/fetchRecommended",
  ({ page = 1, limit = 10, title = "", author = "" }, thunkAPI) =>
    withAuth(thunkAPI, () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      if (title) params.append("title", title);
      if (author) params.append("author", author);

      return axios
        .get(`/books/recommend?${params}`)
        .then((res) => res.data)
        .catch((error) =>
          thunkAPI.rejectWithValue(
            error.response?.data?.message || error.message,
          ),
        );
    }),
);

export const fetchBookDetails = createAsyncThunk(
  "books/fetchBookDetails",
  async (bookId, thunkAPI) => {
    if (!bookId) {
      return thunkAPI.rejectWithValue("bookId is undefined");
    }
    try {
      const token = thunkAPI.getState().auth.token;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get(`/books/${bookId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const addRecommendedBook = createAsyncThunk(
  "books/addRecommendedBook",
  async (bookId, thunkAPI) => {
    const state = thunkAPI.getState();
    const ownBooks = state.books.ownBooks;

    const alreadyExists = ownBooks.some(
      (book) =>
        book.originalId === bookId ||
        book.title ===
          state.books.recommended.find((b) => b._id === bookId)?.title,
    );

    if (alreadyExists) {
      return thunkAPI.rejectWithValue("This book is already in your library.");
    }

    return withAuth(thunkAPI, () =>
      axios
        .post(`/books/add/${bookId}`)
        .then((res) => res.data)
        .catch((error) =>
          thunkAPI.rejectWithValue(
            error.response?.data?.message || error.message,
          ),
        ),
    );
  },
);

export const fetchOwnBooks = createAsyncThunk(
  "books/fetchOwnBooks",
  (_, thunkAPI) =>
    withAuth(thunkAPI, () =>
      axios
        .get("/books/own")
        .then((res) => res.data)
        .catch((error) =>
          thunkAPI.rejectWithValue(
            error.response?.data?.message || error.message,
          ),
        ),
    ),
);

export const addBook = createAsyncThunk("books/addBook", (bookData, thunkAPI) =>
  withAuth(thunkAPI, () =>
    axios
      .post("/books/add", bookData)
      .then((res) => res.data)
      .catch((error) =>
        thunkAPI.rejectWithValue(
          error.response?.data?.message || error.message,
        ),
      ),
  ),
);

export const removeBook = createAsyncThunk(
  "books/removeBook",
  (bookId, thunkAPI) =>
    withAuth(thunkAPI, () =>
      axios
        .delete(`/books/remove/${bookId}`)
        .then(() => bookId)
        .catch((error) =>
          thunkAPI.rejectWithValue(
            error.response?.data?.message || error.message,
          ),
        ),
    ),
);

export const startReading = createAsyncThunk(
  "books/startReading",
  async ({ bookId, page }, thunkAPI) => {
    return withAuth(thunkAPI, async () => {
      try {
        const response = await axios.post("/books/reading/start", {
          id: bookId,
          page,
        });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    });
  },
);

export const finishReading = createAsyncThunk(
  "books/finishReading",
  ({ bookId, page }, thunkAPI) =>
    withAuth(thunkAPI, async () => {
      try {
        const response = await axios.post("/books/reading/finish", {
          id: bookId,
          page,
        });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }),
);

export const deleteReading = createAsyncThunk(
  "books/deleteReading",
  (_, thunkAPI) =>
    withAuth(thunkAPI, () =>
      axios
        .delete("/books/reading")
        .then((res) => res.data)
        .catch((error) =>
          thunkAPI.rejectWithValue(
            error.response?.data?.message || error.message,
          ),
        ),
    ),
);
