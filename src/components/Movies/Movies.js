import Grid from '@material-ui/core/Grid';
import MovieList from '../MovieList/MovieList';
import MovieSort from '../MovieSort/MovieSort';
import './Movies.scss';

export default function Movies() {

  return (
    <Grid container spacing={2} className="movies">
      <Grid item xs={3}>
        <MovieSort />
      </Grid>
      <Grid item xs={9}>
        <MovieList />
      </Grid>
    </Grid>
  )
}