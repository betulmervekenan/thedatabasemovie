import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_KEY, API_BASE_URL } from '../constants'
import axios from 'axios'

export const fetchMovieDetails = createAsyncThunk('detail/fetchMovies', async (movieId, { getState }) => {
  
  const movie = await axios
    .get(`${API_BASE_URL}/movie/${movieId}?api_key=${API_KEY}`, {
      params: {
        api_key: API_KEY,
        movieId: movieId,
      }
    })

  const credits = await axios
  .get(`${API_BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`, {
    params: {
      api_key: API_KEY,
      movieId: movieId,
    }
  })

  return {
    movie: movie.data,
    credits: credits.data,
  }
})

const initialState = {
  title: '',
  genres: [],
  original_title: '',
  release_date: '',
  credits: [],
  backdrop_path: '',
  overview: '', 
}

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    removeMovieDetails: (state, action) => {
      state.title = '';
      state.genres = [];
      state.original_title = '';
      state.release_date = '';
      state.credits = [];
      state.backdrop_path = '';
      state.overview = '';
    }
  },
  extraReducers: {
    [fetchMovieDetails.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [fetchMovieDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      const { title, genres, backdrop_path, original_title, release_date, overview } = action.payload.movie;
      state.title = title;
      state.genres = genres;
      state.backdrop_path = backdrop_path;
      state.original_title = original_title;
      state.release_date = release_date;
      state.overview = overview;
      state.credits = action.payload.credits.cast;
    },
    [fetchMovieDetails.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
  }
})

export default movieSlice.reducer;
export const { removeMovieDetails } = movieSlice.actions;