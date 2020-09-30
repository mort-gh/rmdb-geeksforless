// modules
import React, { Component } from 'react';
import queryString from 'query-string';

// types
import { SearchPropTypes } from 'shared/types/propTypes';

// components
import SearchInputContainer from 'shared/containers/SearchInputContainer';
import SearchListContainer from 'shared/containers/SearchListContainer';
import SearchPaginationContainer from 'shared/containers/SearchPaginationContainer';
import { Spinner } from '../loader/Spinner';

class Search extends Component {
  componentDidMount() {
    const { location, history, fetchMoviesByQuery } = this.props;
    const locationSearch = queryString.parse(location.search);
    const { query, page } = locationSearch;

    if (query) fetchMoviesByQuery(query, page);
    else history.push('/');
  }

  render() {
    const { spinner, searchQuery, error, isLoaded } = this.props;

    return (
      <>
        {spinner && <Spinner />}

        <SearchInputContainer />

        {error && searchQuery.length >= 3 && (
          <h2 className="error">
            Ooops! :( <br />
            {error}
          </h2>
        )}

        {isLoaded && (
          <>
            <SearchListContainer />
            <SearchPaginationContainer />
          </>
        )}
      </>
    );
  }
}

export default Search;

Search.propTypes = SearchPropTypes;
