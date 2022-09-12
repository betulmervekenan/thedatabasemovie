import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, fetchData } from '../../features/searchSlice';
import SearchIcon from '@material-ui/icons/Search';
import './search.scss';

export default function Search() {
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.search)

  const handleChange = e => {
    dispatch(setQuery(e.target.value));
    dispatch(fetchData())
  }

  return (
    <div className='Search'>
      <SearchIcon className="Search-icon" />
      <input className="Search-input" onChange={handleChange} value={query} label="Search" placeholder='Search'></input>
    </div>
  );
}