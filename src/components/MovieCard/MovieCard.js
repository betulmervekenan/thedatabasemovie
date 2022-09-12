import React from 'react'
import { useNavigate } from "react-router-dom";
import { IMAGE_BASE_URL } from '../../constants';
import './MovieCard.scss';

function MovieCard({ data }) {
  const navigate = useNavigate();
  const { poster_path, id, original_title, title, release_date, overview } = data;

  const handleClick = () => {
    navigate(`/movie/${id}`);
  }

  return (
    <div onClick={handleClick} className="movie-card">
      <img src={ IMAGE_BASE_URL + poster_path }></img>
      <div className='movie-card--content'>
        <div className='movie-card--title'>
          <div>{ title }</div>
          <div>{ release_date }</div>
        </div>
        <div className='movie-card--overview'>{ overview }</div>
      </div>
    </div>
  )
}

export default MovieCard