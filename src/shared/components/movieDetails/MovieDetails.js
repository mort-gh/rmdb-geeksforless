// modules
import React, { Component } from 'react';

// types
import { MovieDetailsPropTypes } from 'shared/types/propTypes';

// components
import { Spinner } from '../loader/Spinner';

class MovieDetails extends Component {
  componentDidMount() {
    const { movieID } = this.props.match.params;
    this.props.fetchMoviesByID(movieID);
  }

  imgTagMoviePoster = () => {
    const { Poster, Title } = this.props.movie;
    const noPosterURL = require('../../../assets/images/no_image.jpg');
    const src = Poster === 'N/A' ? noPosterURL : Poster;

    return <img className="details__poster_img" src={src} alt={Title} />;
  };

  htmlLeftBlock = () => {
    const { movie } = this.props;

    return (
      <>
        <div className="details__poster">{this.imgTagMoviePoster()}</div>

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
    const { movie } = this.props;

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
    const { spinner, isLoaded } = this.props;

    return (
      <>
        {spinner && <Spinner />}

        {isLoaded && (
          <div className="details__wrapper">
            <div className="details__leftblock move">
              {this.htmlLeftBlock()}
            </div>
            <div className="details__rightblock move">
              {this.htmlRightBlock()}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default MovieDetails;

MovieDetails.propTypes = MovieDetailsPropTypes;
