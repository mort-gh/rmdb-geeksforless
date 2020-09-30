// modules
import React, { Component } from 'react';

// types
import { SearchPropTypes } from 'shared/types/propTypes';

class SearchInput extends Component {
  /**
   * sends data to the action function and changes url parameters:
   */
  inputHandler = event => {
    event.preventDefault();

    const { fetchMoviesByQuery } = this.props;

    let value = '';
    const page = 1;

    if (event.type === 'change') value = event.target.value;
    if (event.type === 'submit') value = event.target.elements[0].value;

    fetchMoviesByQuery(value, page);
    this.pushParamsToRouterHistory(value, page);
  };

  /**
   * checks the validity of the query and pushes changes to the router history
   */
  pushParamsToRouterHistory = (query, page) => {
    const { history } = this.props;

    if (query && query.length >= 3) {
      history.push({ search: `?query=${query}&page=${page}` });
    } else {
      history.push('/');
    }
  };

  render() {
    const { searchQuery } = this.props;

    return (
      <form className="form" onSubmit={this.inputHandler}>
        <input
          onChange={this.inputHandler}
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
