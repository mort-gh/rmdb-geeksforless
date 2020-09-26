// modules
import React, { Component } from 'react';

class SearchPagination extends Component {
  render() {
    const { movies, currentPage, totalResults } = this.props.state;
    const { calculateTotalPages, loadPage } = this.props;

    return (
      <div>
        <br />
        <p>Total results: {totalResults}</p>
        <p>Total pages: {calculateTotalPages(totalResults)}</p>
        <p>Current page: {currentPage}</p>
        <br />
        {currentPage > 1 && (
          <button type="button" name="prevPage" onClick={loadPage}>
            - prev {+currentPage - 1}
          </button>
        )}
        {movies.length > 9 && (
          <button type="button" name="nextPage" onClick={loadPage}>
            {+currentPage + 1} next +
          </button>
        )}
      </div>
    );
  }
}

export default SearchPagination;
