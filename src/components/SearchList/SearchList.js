import React from 'react'
import { useSelector } from 'react-redux';
import MovieCard from '../MovieCard/MovieCard';
import Grid from '@mui/material/Grid';


function SearchList() {
  const { query, data } = useSelector((state) => state.search);

console.log(data)
  return (
    <div>
      {
        data.map((item) => {
          <Grid key={item.id} item xs={4}>
            <MovieCard data={item} />
          </Grid>
        })
      }
    </div>
  )
}

export default SearchList