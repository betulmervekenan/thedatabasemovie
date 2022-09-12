import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetchMovieDetails, removeMovieDetails } from '../../features/movieSlice';
import { IMAGE_BASE_URL } from '../../constants';
import Grid from '@material-ui/core/Grid';
import './DetailPage.scss';

export default function DetailPage() {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const { title, genres, backdrop_path, original_title, release_date, overview, credits } = useSelector(state => state.movie)

  useEffect(() => {
    dispatch(fetchMovieDetails(movieId));
 
    return () => {
      dispatch(removeMovieDetails());
    }
  }, [movieId]);

  const handleBack = () => {
    window.history.back()
  };
 
  return (
    <Grid container className="movie-detail">
      <Grid item xs={3}>
        <div className='movie-poster'>
          <img src={ IMAGE_BASE_URL + backdrop_path }></img>
        </div>
      </Grid>

      <Grid item xs={6}>
        <div className='movie-overview'>
          <div className='movie-title'>{ title }</div>
          <div className='movie-date'>{ release_date }</div>
          <div>
            <div className='movie-genres--content'>Genres:</div>
            {
              genres.map((item) => {
                return <div className='movie-genres' key={ item.id }>{ item.name }</div>
              })
            }
          </div>

          <div className='movie-overview--content'>Overview:</div>
          <div className='movie-overview'>{ overview }</div>

          <div className='movie-cast--title'>Cast List:</div>
          <div className='movie-cast--content'>
            {
              credits.map((item) => {
                return <h3 className="movie-cast" key={ item.id }>{ item.original_name } </h3>
              })
            }
          </div>
        </div>
      </Grid>

      <Grid item xs={3}>
        <button onClick={handleBack}>
          <div className='movie-back'>
            back
          </div>
        </button>
      </Grid>
    </Grid>
  )
}