import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_KEY } from '../constants'
import { API_BASE_URL } from '../constants'
import axios from 'axios'

export const fetchData = createAsyncThunk(
  'search/fetchData',
  (_, { getState }) => {
    const { query, page } = getState().search;

    return axios
      .get(`${API_BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
          page,
          query,
        }
      })
      .then((response) => response.data)
  }
)

const initialState = {
  query: '',
  page: 1,
  data: [],
  hasMore: true,
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    removeResults: (state) => {
      state.data = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: {
    [fetchData.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [fetchData.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = [
        ...state.data,
        ...action.payload.results,
      ];

      if (action.payload.total_pages === state.page) {
        state.hasMore = false;
      }
    },
    [fetchData.rejected]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
  }
})


export default searchSlice.reducer
export const { setQuery, setPage, removeResults } = searchSlice.actions;