import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    value: '',
  };

  handleInputChange = event => {
    this.setState({ value: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    const { value } = this.state;
    const { inputValue } = this.props;
    event.preventDefault();

    if (value.trim() === '') {
      return toast.error('Please type text....', { pauseOnHover: false });
    }

    inputValue(value);

    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleInputChange}
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
}

Searchbar.propTypes = {
  inputValue: PropTypes.func,
};
