import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from '../../features/listSlice';
import SearchBar from '../../components/SearchBar/SearchBar';
import Movies from '../../components/Movies/Movies';
import SearchResults from '../../components/SearchResults/SearchResults';
import Container from '@mui/material/Container';

export default function HomePage() {
  const dispatch = useDispatch();
  const { query } = useSelector(state => state.search);
  const { moviesFetched } = useSelector(state => state.list);

  useEffect(() => {
    if (!moviesFetched) {
      dispatch(fetchMovies())
    }
  }, []);

  return (
    <Container>
      <SearchBar />
      {query ? <SearchResults /> : <Movies />}
    </Container>
  );
}
