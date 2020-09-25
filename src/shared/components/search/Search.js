import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import fetch from '../../../fetcher';

const styles = {
  block: {
    background: 'palevioletred',
    padding: '100px 500px',
  },
};

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

    if (locationSearch.search) {
      this.fetchMovies(searchQuery, currentPage);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, currentPage } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.fetchMovies(searchQuery, currentPage);
    }

    if (prevState.currentPage !== currentPage) {
      this.fetchMovies(searchQuery, currentPage);
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
    const { searchQuery, currentPage, movies, totalResults } = this.state;

    return (
      <div style={styles.block}>
        <div>
          <button type="button">- prev</button>
          <button type="button">next -</button>
        </div>

        <form onSubmit={this.handleSubmit}>
          <input type="search" defaultValue={searchQuery} />
          <button type="submit">go</button>
        </form>

        <ul>
          {movies.length > 0 &&
            movies.map(movie => (
              <li key={movie.imdbID}>
                <Link
                  to={{
                    pathname: `/movies/${movie.imdbID}`,
                    state: {
                      pathLocal:
                        this.props.location.pathname +
                        this.props.location.search,
                    },
                  }}
                >
                  {movie.Title} - ({movie.Year})
                </Link>
              </li>
            ))}
        </ul>

        {movies.length > 0 && (
          <div>
            <p>Total pages: {this.calculateTotalPages(totalResults)}</p>
            <p>Current page: {currentPage}</p>
            {currentPage > 1 && (
              <button type="button" name="prevPage" onClick={this.loadPage}>
                - prev {+currentPage - 1}
              </button>
            )}
            {movies.length > 9 && (
              <button type="button" name="nextPage" onClick={this.loadPage}>
                {+currentPage + 1} next +
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Search);
