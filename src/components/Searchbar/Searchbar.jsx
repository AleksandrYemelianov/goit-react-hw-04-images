import React, { Component } from 'react'
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { MdImageSearch } from 'react-icons/md';


export default class Searchbar extends Component {
  state = {
    value: '',
  }

  static propTypes = {
         handleFind: PropTypes.func.isRequired,
     };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({value: value.trim()})
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { value } = this.state;
    this.props.handleFind(value)
  }

  render() {
    const { handleChange, handleSubmit } = this;
    const { value } = this.state;

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
    )
  }
}
