// modules
import React, { Component } from 'react';

// types
import { SearchPropTypes } from 'shared/types/propTypes';

class SearchInput extends Component {
  handleChange = event => {
    const { history, fetchMoviesByQuery } = this.props;
    const { value } = event.target;
    const page = 1;

    fetchMoviesByQuery(value, page);

    if (value && value.length >= 3) {
      history.push({ search: `?query=${value}&page=${page}` });
    } else {
      history.push('/');
    }
  };

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
          onChange={this.handleChange}
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

SearchInput.propTypes = SearchPropTypes;
