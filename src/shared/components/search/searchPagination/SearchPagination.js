// modules
import React, { Component } from 'react';

// styles
import './searchPagination.scss';

class SearchPagination extends Component {
  nextPageHandler = event => {
    const { name } = event.currentTarget;
    const {
      history,
      searchQuery,
      currentPage,
      fetchMoviesByQuery,
    } = this.props;

    const nextPage = this.calculateNextPage(currentPage, name);
    history.push({ search: `?query=${searchQuery}&page=${nextPage}` });
    fetchMoviesByQuery(searchQuery, nextPage);
  };

  calculateNextPage = (page, btnName) => {
    page = +page;

    if (btnName === 'nextPage') page += 1;
    if (btnName === 'prevPage') page -= 1;
    if (page < 2) page = 1;

    return page;
  };

  calculateTotalPages = value => {
    const toCeilTotalPages = Math.ceil(value / 10) * 10;
    const moviesPerPage = 10;
    const totalPages = toCeilTotalPages / moviesPerPage;
    return totalPages;
  };

  htmlTotalPagesInfo = () => {
    const { totalResults, currentPage } = this.props;

    return (
      <div className="pagination__info">
        <p>
          Total results: &nbsp;
          <span>{totalResults}</span>
        </p>
        <p>
          Current page: &nbsp;
          <span>
            {currentPage}&nbsp;/&nbsp;
            {this.calculateTotalPages(totalResults)}
          </span>
        </p>
      </div>
    );
  };

  htmlPrevButton = () => {
    const { currentPage } = this.props;
    const prevPage = +currentPage - 1;

    return (
      <button
        type="button"
        name="prevPage"
        className="pagination__controllers_prev"
        onClick={this.nextPageHandler}
      >
        <img
          className="pagination__arrow_prev"
          src={require('../../../../assets/svg/arrow.svg')}
          alt="prev"
        />
        <span>{prevPage}</span>
      </button>
    );
  };

  htmlNextButton = () => {
    const { currentPage } = this.props;
    const nextPage = +currentPage + 1;

    return (
      <button
        type="button"
        name="nextPage"
        className="pagination__controllers_next"
        onClick={this.nextPageHandler}
      >
        <span>{nextPage}</span>
        <img
          className="pagination__arrow_next"
          src={require('../../../../assets/svg/arrow.svg')}
          alt="prev"
        />
      </button>
    );
  };

  render() {
    const { movies, currentPage } = this.props;

    const renderPrevBtn = currentPage > 1 && this.htmlPrevButton();
    const renderNextBtn = movies.length > 9 && this.htmlNextButton();

    return (
      <div className="pagination__wrapper">
        <div className="pagination__block">
          {this.htmlTotalPagesInfo()}
          <div className="pagination__controllers">
            {renderPrevBtn}
            {renderNextBtn}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchPagination;
