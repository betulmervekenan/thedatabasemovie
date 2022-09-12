import { useDispatch, useSelector } from 'react-redux';
import { setQuery, fetchData, removeResults } from '../../features/searchSlice';
import { useDebounce, useUpdateEffect } from '../../utils/hooks';
import TextField from '@mui/material/TextField';

export default function SearchBar() {
  const dispatch = useDispatch();
  const { query } = useSelector(state => state.search);
  const debouncedValue = useDebounce(query, 300);

  useUpdateEffect(() => {
    dispatch(removeResults());
    if (debouncedValue) {
      dispatch(fetchData());
    }
  }, [debouncedValue])

  const handleChange = (e) => {
    dispatch(setQuery(e.target.value))
  }

  return (
    <div>
      <TextField
        value={query}
        onChange={handleChange}
        fullWidth
        label="Search"
        variant="standard"
        style={{ marginTop: 15 }}
      />
    </div>
  )
}