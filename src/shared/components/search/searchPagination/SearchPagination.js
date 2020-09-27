// modules
import React, { Component } from 'react';

// styles
import './searchPagination.scss';

class SearchPagination extends Component {
  htmlPageInfo = () => {
    const { state, calculateTotalPages } = this.props;
    const { totalResults, currentPage } = this.props.state;

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
            {calculateTotalPages(totalResults)}
          </span>
        </p>
      </div>
    );
  };

  htmlPrevButton = () => {
    const { state, loadPage } = this.props;
    const prevPage = +state.currentPage - 1;

    return (
      <button
        type="button"
        name="prevPage"
        className="pagination__controllers_prev"
        onClick={loadPage}
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
    const { state, loadPage } = this.props;
    const nextPage = +state.currentPage + 1;

    return (
      <button
        type="button"
        name="nextPage"
        className="pagination__controllers_next"
        onClick={loadPage}
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
    const { movies, currentPage } = this.props.state;

    const renderPrevBtn = currentPage > 1 && this.htmlPrevButton();
    const renderNextBtn = movies.length > 9 && this.htmlNextButton();

    return (
      <div className="pagination__wrapper">
        <div className="pagination__block">
          {this.htmlPageInfo()}
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
