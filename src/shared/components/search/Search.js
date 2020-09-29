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

// styles
import './search.scss';

class Search extends Component {
  componentDidMount() {
    const { location, history, fetchMoviesByQuery } = this.props;
    const locationSearch = queryString.parse(location.search);
    const { query, page } = locationSearch;

    if (query) fetchMoviesByQuery(query, page);
    else history.push('/');
  }

  render() {
    const { spinner, isLoaded, error } = this.props;

    return (
      <>
        {spinner && <Spinner />}

        <SearchInputContainer />

        {error && <h2 className="error">{error}</h2>}

        {isLoaded && !error && (
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
