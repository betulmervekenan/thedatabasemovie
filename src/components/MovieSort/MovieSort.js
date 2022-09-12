import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, setSortBy } from '../../features/listSlice';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './MovieSort.scss';

export default function MovieSort() {
  const dispatch = useDispatch();
  const { sortBy } = useSelector(state => state.list);

  const handleChange = (e) => {
    if (sortBy !== e.target.value) {
      dispatch(setSortBy(e.target.value));
      dispatch(fetchMovies());
    }
  }

  return (
    <div>
      Sort Results By
      <div>
        <Select
          value={sortBy}
          label="Order By"
          onChange={handleChange}
        >
          <MenuItem value="popularity.desc">Popularity Descending</MenuItem>
          <MenuItem value="popularity.asc">Popularity Ascending</MenuItem>
          <MenuItem value="vote_average.desc">Rating Descending</MenuItem>
          <MenuItem value="vote_average.asc">Rating Ascending</MenuItem>
          <MenuItem value="release_date.desc">Release Date Descending</MenuItem>
          <MenuItem value="release_date.asc">Release Date Ascending</MenuItem>
          <MenuItem value="original_title.desc">Title (A-Z)</MenuItem>
          <MenuItem value="original_title.asc">Title (Z-A)</MenuItem>
        </Select>
      </div>
    </div>

  )
}