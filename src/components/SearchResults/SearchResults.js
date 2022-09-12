import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchData, setPage } from '../../features/searchSlice'
import MovieCard from "../MovieCard/MovieCard";
import Grid from '@material-ui/core/Grid';
import './SearchResults.scss';

function SearchResults() {
  const dispatch = useDispatch();

  const {
    data,
    page,
    hasMore,
  } = useSelector(state => state.search);

  const fetchNext = (e) => {
    dispatch(setPage(page + 1));
    dispatch(fetchData());
  }

  return (
    <InfiniteScroll
      dataLength={data.length} //This is important field to render the next data
      next={fetchNext}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <Grid container spacing={2} className="movies">
        {data.length === 0 ? <div style={{ margin: 30, fontSize: 20 }}>Try a different search term or check the spelling....</div> :
          data.map((movie) => (
            <Grid item xs={3} key={movie.id}>
              <MovieCard data={movie} />
            </Grid>
          ))}
      </Grid>
    </InfiniteScroll>
  )
}


export default SearchResults;