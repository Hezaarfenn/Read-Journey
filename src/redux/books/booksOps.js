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

// Önerilen kitapları getir (GET /books/recommend)
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

// fetchBookDetails fonksiyonunu try-catch ile güncelle
export const fetchBookDetails = createAsyncThunk(
  "books/fetchBookDetails",
  async (bookId, thunkAPI) => {
    console.log("🛠 fetchBookDetails çağrıldı, bookId:", bookId);
    if (!bookId) {
      console.warn("⚠️ fetchBookDetails - bookId undefined!");
      return thunkAPI.rejectWithValue("bookId is undefined");
    }
    try {
      const token = thunkAPI.getState().auth.token;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get(`/books/${bookId}`);
      return response.data;
    } catch (error) {
      console.error("🔥 fetchBookDetails API error:", error.response || error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Önerilen kitaplardan kitap ekle (POST /books/add/{id})
export const addRecommendedBook = createAsyncThunk(
  "books/addRecommendedBook",
  (bookId, thunkAPI) =>
    withAuth(thunkAPI, () =>
      axios
        .post(`/books/add/${bookId}`)
        .then((res) => res.data)
        .catch((error) =>
          thunkAPI.rejectWithValue(
            error.response?.data?.message || error.message,
          ),
        ),
    ),
);

// Kullanıcının kitaplarını getir (GET /books/own)
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

// Yeni kitap ekle (POST /books/add)
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

// Kullanıcının kitabını sil (DELETE /books/remove/{id})
export const removeBook = createAsyncThunk(
  "books/removeBook",
  (bookId, thunkAPI) =>
    withAuth(thunkAPI, () =>
      axios
        .delete(`/books/remove/${bookId}`)
        .then(() => bookId) // başarılıysa sadece id dön
        .catch((error) =>
          thunkAPI.rejectWithValue(
            error.response?.data?.message || error.message,
          ),
        ),
    ),
);

// Okuma başlat (POST /books/reading/start)
export const startReading = createAsyncThunk(
  "books/startReading",
  ({ bookId, page }, thunkAPI) =>
    withAuth(thunkAPI, () =>
      axios
        .post("/books/reading/start", { bookId, page })
        .then((res) => res.data)
        .catch((error) =>
          thunkAPI.rejectWithValue(
            error.response?.data?.message || error.message,
          ),
        ),
    ),
);

// Okuma bitir (POST /books/reading/finish)
export const finishReading = createAsyncThunk(
  "books/finishReading",
  ({ bookId, page }, thunkAPI) =>
    withAuth(thunkAPI, () =>
      axios
        .post("/books/reading/finish", { bookId, page })
        .then((res) => res.data)
        .catch((error) =>
          thunkAPI.rejectWithValue(
            error.response?.data?.message || error.message,
          ),
        ),
    ),
);

// Okuma kaydını sil (DELETE /books/reading)
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
