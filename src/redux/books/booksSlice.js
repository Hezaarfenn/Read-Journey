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
  // Reading session state
  currentSession: null,
  currentBookId: null,
  sessions: [],
  sessionsByBookId: {},
  isRecording: false,
  viewMode: "diary",
  startPage: "",
  stopPage: "",
  // Filter state
  filter: {
    title: "",
    author: "",
  },
  pagination: {
    page: 1,
    totalPages: 1,
  },
  // Modal state
  showCompletionModal: false,
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

    // Reading session actions
    setCurrentSession: (state, action) => {
      state.currentSession = action.payload;
    },
    setIsRecording: (state, action) => {
      state.isRecording = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setStartPage: (state, action) => {
      state.startPage = action.payload;
    },
    setStopPage: (state, action) => {
      state.stopPage = action.payload;
    },
    setShowCompletionModal: (state, action) => {
      state.showCompletionModal = action.payload;
    },
    setCurrentBookId: (state, action) => {
      state.currentBookId = action.payload;
    },

    addSession: (state, action) => {
      if (!state.currentBookId) return;

      if (!state.sessionsByBookId[state.currentBookId]) {
        state.sessionsByBookId[state.currentBookId] = [];
      }

      state.sessionsByBookId[state.currentBookId].push(action.payload);

      if (
        state.sessionsByBookId[state.currentBookId].length === 1 &&
        state.viewMode === "progress"
      ) {
        state.viewMode = "diary";
      }
    },
    updateSession: (state, action) => {
      if (!state.currentBookId) return;

      const sessions = state.sessionsByBookId[state.currentBookId] || [];
      const index = sessions.findIndex(
        (session) => session.id === action.payload.id,
      );

      if (index !== -1) {
        sessions[index] = {
          ...sessions[index],
          ...action.payload,
        };
      }
    },
    updateLastReadPage: (state, action) => {
      const { bookId, page } = action.payload;
      state.lastReadPages[bookId] = page;
    },
    removeSession: (state, action) => {
      if (!state.currentBookId) return;

      state.sessionsByBookId[state.currentBookId] = state.sessionsByBookId[
        state.currentBookId
      ].filter((session) => session.id !== action.payload);
    },
    clearSessions: (state) => {
      if (!state.currentBookId) return;

      state.sessionsByBookId[state.currentBookId] = [];
      state.currentSession = null;
      state.isRecording = false;
      state.startPage = "";
      state.stopPage = "";
    },

    initializeReading: (state, action) => {
      const bookId = action.payload;
      if (!bookId) return;

      // sessionsByBookId yoksa oluştur
      if (!state.sessionsByBookId) {
        state.sessionsByBookId = {};
      }

      state.currentBookId = bookId;

      // Bu kitap için oturum yoksa boş dizi oluştur
      if (!state.sessionsByBookId[bookId]) {
        state.sessionsByBookId[bookId] = [];
      }

      if (state.sessionsByBookId[bookId].length === 0) {
        state.viewMode = "progress";
      }
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
        if (
          !state.ownBooks.some((book) => book.title === action.payload.title)
        ) {
          state.ownBooks.push(action.payload);
        }
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

export const {
  resetBookDetails,
  setAuthorFilter,
  setTitleFilter,
  setCurrentSession,
  setIsRecording,
  setViewMode,
  setStartPage,
  setStopPage,
  setShowCompletionModal,
  addSession,
  updateSession,
  updateLastReadPage,
  removeSession,
  clearSessions,
  initializeReading,
} = booksSlice.actions;

export default booksSlice.reducer;
