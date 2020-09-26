import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class SearchList extends Component {
  render() {
    const { movies, location } = this.props;

    return (
      <ul>
        {movies.length > 0 &&
          movies.map(movie => (
            <li key={movie.imdbID}>
              <Link
                to={{
                  pathname: `/movies/${movie.imdbID}`,
                  state: {
                    pathLocal: location.pathname + location.search,
                  },
                }}
              >
                {movie.Title} - ({movie.Year})
              </Link>
            </li>
          ))}
      </ul>
    );
  }
}

export default withRouter(SearchList);
