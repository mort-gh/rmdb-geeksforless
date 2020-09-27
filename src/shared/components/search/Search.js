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
import SearchList from './searchList/SearchList';
import SearchInput from './searchInput/SearchInput';
import SearchPagination from './searchPagination/SearchPagination';
import { Loader } from '../loader/Loader';

class Search extends Component {
  state = {
    searchQuery: '',
    currentPage: 1,
    movies: [],
    totalResults: 0,
    load: true,
  };

  componentDidMount() {
    const { searchQuery, currentPage } = this.state;

    this.saveURLparams();
    this.fetchMovies(searchQuery, currentPage);
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, currentPage } = this.state;
    const { location, history } = this.props;
    const locationSearch = queryString.parse(location.search);

    if (prevState.searchQuery !== searchQuery) {
      this.fetchMovies(searchQuery, currentPage);
      this.scrollPageAfterSubmit();
    }

    if (prevState.currentPage !== currentPage) {
      this.fetchMovies(searchQuery, currentPage);
      this.scrollPageAfterSubmit();
    }

    if (locationSearch && locationSearch.query === '') {
      history.push('/');
      this.setState({ load: false });
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
    try {
      const data = await fetch.getMoviesBySearchQuery(query, page);

      this.setState({
        movies: data.Search || [],
        totalResults: data.totalResults,
        load: false,
      });

      this.scrollPageAfterSubmit();
    } catch (error) {
      console.log('Fetch error from Search component', error);
      throw new Error(error);
    }
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
      load: true,
    });
  };

  scrollPageAfterSubmit = () => {
    window.scrollTo({
      top: 730,
      behavior: 'smooth',
    });
  };

  handleClickLoadPage = event => {
    const { search } = this.props.location;
    const locationSearch = queryString.parse(search);
    let { query, page } = locationSearch;
    page = +page;

    const { name } = event.currentTarget;

    if (name === 'nextPage') page += 1;
    if (name === 'prevPage') page -= 1;
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
    const { searchQuery, movies, load } = this.state;

    return (
      <>
        {load && <Loader />}

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
      </>
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
