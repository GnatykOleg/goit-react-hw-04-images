import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Searchbar.module.css';

export default function Searchbar({ inputValue }) {
  const [value, setValue] = useState('');

  const handleInputChange = event => {
    const { value } = event.currentTarget;
    setValue(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (value.trim() === '') {
      return toast.error('Please type text....', { pauseOnHover: false });
    }
    inputValue(value);

    setValue('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          onChange={handleInputChange}
          value={value}
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit" className={s.button}>
          Search
        </button>
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  inputValue: PropTypes.func,
};
