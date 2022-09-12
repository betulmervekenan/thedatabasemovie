import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMovies, setPage } from '../../features/listSlice';
import MovieCard from './../MovieCard/MovieCard';
import Grid from '@material-ui/core/Grid';
import './MovieList.scss';

function MovieList() {
  const dispatch = useDispatch();
  const {
    movies,
    page,
    hasMore,
  } = useSelector(state => state.list);

  const fetchNext = (e) => {
    dispatch(setPage(page + 1));
    dispatch(fetchMovies());
  }

  return (
    <InfiniteScroll
      dataLength={movies.length} //This is important field to render the next data
      next={fetchNext}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <Grid container spacing={2}>
        {movies.map(movie => (
          <Grid item xs={3} key={movie.id}>
            <MovieCard data={movie} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  )
}

export default MovieList;