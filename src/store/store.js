import { configureStore } from "@reduxjs/toolkit";
import listSlice from "../features/listSlice";
import searchSlice from "../features/searchSlice";
import movieSlice from "../features/movieSlice";

export const store = configureStore({
  reducer: {
    list: listSlice,
    search: searchSlice,
    movie: movieSlice,
  }
})