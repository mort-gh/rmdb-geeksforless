// modules
import React, { Component } from 'react';

// styles
import './searchInput.scss';

class SearchInput extends Component {
  handleSubmit = event => {
    event.preventDefault();

    const { history, fetchMoviesByQuery } = this.props;
    const value = event.target.elements[0].value;
    const page = 1;

    history.push({ search: `?query=${value}&page=${page}` });

    if (value) fetchMoviesByQuery(value, page);
    else history.push('/');
  };

  render() {
    const { searchQuery } = this.props;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <input
          className="form__input"
          type="text"
          defaultValue={searchQuery}
          placeholder="Search ..."
        />
      </form>
    );
  }
}

export default SearchInput;
