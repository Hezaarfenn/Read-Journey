import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecommendedBooks,
  fetchBookDetails,
  addRecommendedBook,
  fetchOwnBooks,
  addBook,
  removeBook,
  startReading,
  finishReading,
  deleteReading,
} from "./booksOps";

const initialState = {
  recommended: [],
  myLibrary: [],
  ownBooks: [],
  bookDetails: null,
  isLoading: false,
  error: null,
  filter: {
    title: "",
    author: "",
  },
  pagination: {
    page: 1,
    totalPages: 1,
  },
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      state.filter.title = action.payload;
    },
    setAuthorFilter: (state, action) => {
      state.filter.author = action.payload;
    },
    resetBookDetails: (state) => {
      state.bookDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendedBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecommendedBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recommended = action.payload.results;
        state.pagination.page = action.payload.page;
        state.pagination.totalPages = action.payload.totalPages;
      })
      .addCase(fetchRecommendedBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchBookDetails.fulfilled, (state, action) => {
        state.bookDetails = action.payload;
      })
      .addCase(addRecommendedBook.fulfilled, (state, action) => {
        state.ownBooks.push(action.payload);
      })
      .addCase(fetchOwnBooks.fulfilled, (state, action) => {
        state.ownBooks = action.payload.results;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.ownBooks.push(action.payload);
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        state.ownBooks = state.ownBooks.filter(
          (book) => book._id !== action.payload,
        );
      })
      .addCase(startReading.fulfilled, (state, action) => {
        state.bookDetails = action.payload;
      })
      .addCase(finishReading.fulfilled, (state, action) => {
        state.bookDetails = action.payload;
      })
      .addCase(deleteReading.fulfilled, (state) => {
        state.bookDetails = null;
      });
  },
});

export const { resetBookDetails, setAuthorFilter, setTitleFilter } =
  booksSlice.actions;
export default booksSlice.reducer;
