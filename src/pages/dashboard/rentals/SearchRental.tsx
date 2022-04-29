import { useEffect, useRef } from 'react';
import { TextField, FormControl } from '@mui/material';

interface Props {
  handleSearch: (currentValue: string) => void;
}

const SearchRental = ({ handleSearch }: Props): JSX.Element => {
  const inputEl: any = useRef();
  let typingTimer;
  useEffect(
    () => () => {
      clearTimeout(typingTimer);
    },
    [typingTimer],
  );

  const onSearchLocation = () => {
    const currentValue = inputEl?.current?.value;
    handleSearch(currentValue);
  };

  const doneTyping = () => {
    onSearchLocation();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearchLocation();
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') return;
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, 500);
  };

  const handleKeyDown = () => {
    clearTimeout(typingTimer);
  };

  return (
    <FormControl>
      <TextField
        placeholder="Search renter by name"
        name="search"
        variant="outlined"
        fullWidth
        sx={{ minWidth: '480px' }}
        inputProps={{
          ref: inputEl,
          onKeyDown: handleKeyDown,
          onKeyUp: handleKeyUp,
          onKeyPress: handleKeyPress,
        }}
      />
    </FormControl>
  );
};

export default SearchRental;
