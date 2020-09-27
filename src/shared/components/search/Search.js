// modules
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import queryString from 'query-string';

// services
import fetch from '../../../api/fetcher';
import { actionFetchMovies } from './searchActions';

// components
import SearchList from './SearchList';
import SearchInput from './SearchInput';
import SearchPagination from './SearchPagination';

class Search extends Component {
  state = {
    searchQuery: '',
    currentPage: 1,
    movies: [],
    totalResults: 0,
  };

  async componentDidMount() {
    const { searchQuery, currentPage } = this.state;

    this.saveURLparams();
    await this.fetchMovies(searchQuery, currentPage);
  }

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, currentPage } = this.state;
    const { location, history } = this.props;
    const locationSearch = queryString.parse(location.search);

    if (prevState.searchQuery !== searchQuery) {
      await this.fetchMovies(searchQuery, currentPage);
    }

    if (prevState.currentPage !== currentPage) {
      await this.fetchMovies(searchQuery, currentPage);
    }

    if (locationSearch && locationSearch.query === '') {
      history.push('/');
    }
  }

  saveURLparams = () => {
    const { search } = this.props.location;
    const locationSearch = queryString.parse(search);

    this.setState({
      searchQuery: locationSearch.query || '',
      currentPage: locationSearch.page || 1,
    });
  };

  fetchMovies = async (query, page) => {
    const data = await fetch.getMoviesBySearchQuery(query, page);

    this.setState({
      movies: data.Search || [],
      totalResults: data.totalResults,
    });

    actionFetchMovies(data);
  };

  handleSubmit = event => {
    event.preventDefault();

    const inputValue = event.target.elements[0].value;
    const page = 1;

    this.props.history.push({
      search: `?query=${inputValue}&page=${page}`,
    });

    this.setState({
      searchQuery: inputValue,
      currentPage: page,
    });
  };

  handleClickLoadPage = event => {
    const { search } = this.props.location;
    const locationSearch = queryString.parse(search);
    let { query, page } = locationSearch;
    page = +page;

    const btnName = event.target.name;

    if (btnName === 'nextPage') page += 1;
    if (btnName === 'prevPage') page -= 1;
    if (page < 2) page = 1;

    this.getURLtoOpenTextPage(query, page);
  };

  getURLtoOpenTextPage = (query, page) => {
    const { history } = this.props;

    history.push({
      search: `?query=${query}&page=${page}`,
    });

    this.setState({
      searchQuery: query,
      currentPage: page,
    });
  };

  calculateTotalPages = value => {
    const toCeilTotalPages = Math.ceil(value / 10) * 10;
    const moviesPerPage = 10;
    return toCeilTotalPages / moviesPerPage;
  };

  render() {
    const { searchQuery, movies } = this.state;

    return (
      <div>
        <SearchInput
          handleSubmit={this.handleSubmit}
          defaultValue={searchQuery}
        />

        {movies.length > 0 && (
          <>
            <SearchList movies={movies} />
            <SearchPagination
              state={this.state}
              calculateTotalPages={this.calculateTotalPages}
              loadPage={this.handleClickLoadPage}
            />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchQuery: state.search.searchQuery,
  currentPage: state.search.currentPage,
  movies: state.search.movies,
  totalResults: state.search.totalResults,
  load: state.search.load,
  error: state.search.error,
});

const mapDispatchToProps = dispatch => ({
  actionFetchMovies: () => dispatch(actionFetchMovies()),
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Search);
