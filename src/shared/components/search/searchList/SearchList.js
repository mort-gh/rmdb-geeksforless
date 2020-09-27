// modules
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

// styles
import './searchList.scss';

class SearchList extends Component {
  renderListItems = movie => {
    const { pathname, search } = this.props.location;

    return (
      <li className="search__list_item" key={movie.imdbID}>
        <Link
          className="search__list_link"
          to={{
            pathname: `/movie/${movie.imdbID}`,
            state: { pathLocal: pathname + search },
          }}
        >
          <div className="item__block">
            <div className="item__block_left">
              <span className="item__left_span">{movie.Title}</span>
            </div>
            <div className="item__block_right">
              <span className="item__right_span">{movie.Year}</span>
              <span className="item__right_span">{movie.Type}</span>
            </div>
          </div>
        </Link>
      </li>
    );
  };

  render() {
    const { movies } = this.props;

    return (
      <div className="list__wrapper">
        <ul className="search__list">
          {movies.length > 0 &&
            movies.map(movie => this.renderListItems(movie))}
        </ul>
      </div>
    );
  }
}

export default withRouter(SearchList);
