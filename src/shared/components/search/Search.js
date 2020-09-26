import React, { Component } from 'react';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import fetch from '../../../fetcher';
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
    const locationSearch = queryString.parse(this.props.location.search);

    this.setState({
      searchQuery: locationSearch.query || '',
      currentPage: locationSearch.page || 1,
    });

    const { searchQuery, currentPage } = this.state;

    if (locationSearch) {
      await this.fetchMovies(searchQuery, currentPage);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, currentPage } = this.state;
    const { location, history } = this.props;

    if (prevState.searchQuery !== searchQuery) {
      await this.fetchMovies(searchQuery, currentPage);
    }

    if (prevState.currentPage !== currentPage) {
      await this.fetchMovies(searchQuery, currentPage);
    }

    const locationSearch = queryString.parse(location.search);

    if (locationSearch && locationSearch.query === '') {
      history.push('/');
    }
  }

  fetchMovies = async (query, page) => {
    const data = await fetch.getMoviesBySearchQuery(query, page);

    this.setState({
      movies: data.Search || [],
      totalResults: data.totalResults,
    });
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

  loadPage = event => {
    const locationSearch = queryString.parse(this.props.location.search);
    let { query, page } = locationSearch;
    const btnName = event.target.name;
    page = +page;

    if (btnName === 'nextPage') page += 1;
    if (btnName === 'prevPage') page -= 1;
    if (page < 2) page = 1;

    this.props.history.push({ search: `?query=${query}&page=${page}` });

    this.setState({
      searchQuery: query,
      currentPage: page,
    });
  };

  calculateTotalPages = value => {
    const ceiledTotalPages = Math.ceil(value / 10) * 10;
    const moviesPerPage = 10;
    return ceiledTotalPages / moviesPerPage;
  };

  render() {
    const { searchQuery, movies } = this.state;

    return (
      <div>
        <h1>Explore movies & series</h1>
        <SearchInput
          handleSubmit={this.handleSubmit}
          defaultValue={searchQuery}
        />

        <br />

        <SearchList movies={movies} />

        <br />

        {movies.length > 0 && (
          <SearchPagination
            state={this.state}
            calculateTotalPages={this.calculateTotalPages}
            loadPage={this.loadPage}
          />
        )}
      </div>
    );
  }
}

export default withRouter(Search);
