// modules
import React, { Component } from 'react';
import { withRouter } from 'react-router';

// services
import fetch from '../../../api/fetcher';

// styles
import './movieDetails.scss';

class MovieDetails extends Component {
  state = {
    movie: null,
  };

  componentDidMount() {
    const { movieID } = this.props.match.params;

    this.fetchMovie(movieID);
  }

  fetchMovie = async id => {
    try {
      const data = await fetch.getMovieByID(id);

      this.setState({
        movie: data || null,
      });
    } catch (error) {
      console.error('MovieDetails fetch movie error: ', error);
      throw new Error(error);
    }
  };

  htmlLeftBlock = () => {
    const { movie } = this.state;

    return (
      <>
        <div className="details__poster">
          <img
            className="details__poster_img"
            src={movie.Poster}
            alt={movie.Title}
          />
        </div>

        <div className="details__rating">
          <span className="details__rating_title">IMDb Rating:</span>
          <br />
          <span className="details__rating_value">{movie.imdbRating} / </span>
          <span className="details__rating_title">10</span>
        </div>
      </>
    );
  };

  htmlRightBlock = () => {
    const { movie } = this.state;

    return (
      <>
        <div className="details__title">
          <span className="details__title_title">{movie.Title}</span>
        </div>

        <div className="details__runtime">
          <span className="details__key">Runtime: </span>
          <span className="details__value">{movie.Runtime}</span>
        </div>

        <div className="details__genre">
          <span className="details__key">Genre: </span>
          <span className="details__value">{movie.Genre}</span>
        </div>

        <div className="details__year">
          <span className="details__key">Year: </span>
          <span className="details__value">{movie.Year}</span>
        </div>

        <div className="details__type">
          <span className="details__key">Type: </span>
          <span className="details__value">{movie.Type}</span>
        </div>

        <div className="details__plot">
          <span className="details__plot_title">{movie.Plot}</span>
        </div>
      </>
    );
  };

  render() {
    const { movie } = this.state;

    return (
      <div className="details__wrapper">
        <div className="details__leftblock">
          {movie && this.htmlLeftBlock()}
        </div>
        <div className="details__rightblock">
          {movie && this.htmlRightBlock()}
        </div>
      </div>
    );
  }
}

export default withRouter(MovieDetails);
