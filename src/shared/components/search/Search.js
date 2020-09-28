// modules
import React, { Component } from 'react';
import queryString from 'query-string';

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
    const { spinner, isLoaded } = this.props;

    return (
      <>
        {spinner && <Spinner />}

        <SearchInputContainer />

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
