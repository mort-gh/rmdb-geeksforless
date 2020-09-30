// modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// types
import { SearchPropTypes } from 'shared/types/propTypes';

// styles
import './searchList.scss';

class SearchList extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { innerHeight, pageYOffset } = window;
    const { offsetHeight } = document.body;
    const isScrolledDown = innerHeight + pageYOffset >= offsetHeight;

    console.log('innerHeight', innerHeight);
    console.log('pageYOffset', pageYOffset);
    console.log('offsetHeight', offsetHeight);

    if (isScrolledDown) {
      const {
        searchQuery,
        currentPage,
        fetchMoviesByScroll,
        history,
      } = this.props;

      const nextPage = currentPage + 1;

      fetchMoviesByScroll(searchQuery, nextPage);
      history.push({ search: `?query=${searchQuery}&page=${nextPage}` });
    }
  };

  renderListItems = movie => {
    const { pathname, search } = this.props.location;

    const linkOptions = {
      pathname: `/movie/${movie.imdbID}`,
      state: { pathLocal: pathname + search },
    };

    return (
      <li className="search__list_item move" key={movie.imdbID}>
        <Link className="search__list_link" to={linkOptions}>
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
    const { movies, isLoaded } = this.props;

    return (
      <div className="list__wrapper">
        <ul className="search__list">
          {isLoaded && movies.map(movie => this.renderListItems(movie))}
        </ul>
      </div>
    );
  }
}

export default SearchList;

SearchList.propTypes = SearchPropTypes;
