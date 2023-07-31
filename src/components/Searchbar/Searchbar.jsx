import React, { useState } from 'react'
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import optionNotification from 'components/Notification/Notification'
import 'react-toastify/dist/ReactToastify.css';
import { MdImageSearch } from 'react-icons/md';

export default function Searchbar({handleFind}) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === '') {
      toast.warn('Please enter for example, "cat", "bicycle", etc.', optionNotification);
    }
    handleFind(value);
  };
  
  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <button type="submit" className={css.searchFormBtn}>
          <span className={css.btnLabel}><MdImageSearch className={css.iconSearch} /></span>
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
         handleFind: PropTypes.func.isRequired,
};
    