import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_KEY, API_BASE_URL } from '../constants'
import axios from 'axios'

const initialState = {
  movies: [],
  loading: false,
  error: null,
  sortBy: 'popularity.desc',
  page: 1,
  moviesFetched: false,
  hasMore: true,
}

export const fetchMovies = createAsyncThunk('list/fetchMovies', (_, { getState }) => {
  const listState = getState().list;

  return axios
    .get(`${API_BASE_URL}/discover/movie?api_key=${API_KEY}`, {
      params: {
        api_key: API_KEY,
        sort_by: listState.sortBy,
        page: listState.page,
      }
    })
    .then((response) => response.data)
})

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.page = 1;
      state.movies = [];
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: {
    [fetchMovies.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [fetchMovies.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.movies = [
        ...state.movies,
        ...action.payload.results,
      ];
      state.moviesFetched = true;

      if (action.payload.total_pages === state.page) {
        state.hasMore = false;
      }
    },
    [fetchMovies.rejected]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
  }
})

export default listSlice.reducer;

export const { setSortBy, setPage } = listSlice.actions;