// modules
import React, { Component } from 'react';
import { withRouter } from 'react-router';

// services
import fetch from '../../../api/fetcher';

// components
import { Loader } from '../loader/Loader';

// styles
import './movieDetails.scss';

class MovieDetails extends Component {
  state = {
    movie: null,
    load: true,
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
        load: false,
      });
    } catch (error) {
      console.error('MovieDetails fetch movie error: ', error);
      throw new Error(error);
    }
  };

  isMovieHasPoster = () => {
    const { Poster, Title } = this.state.movie;
    const noPosterURL = require('../../../assets/images/no_image.jpg');
    const src = Poster === 'N/A' ? noPosterURL : Poster;

    return <img className="details__poster_img" src={src} alt={Title} />;
  };

  htmlLeftBlock = () => {
    const { movie } = this.state;

    return (
      <>
        <div className="details__poster">{this.isMovieHasPoster()}</div>

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
    const { movie, load } = this.state;

    return (
      <>
        {load && <Loader />}

        <div className="details__wrapper">
          <div className="details__leftblock">
            {movie && !load && this.htmlLeftBlock()}
          </div>
          <div className="details__rightblock">
            {movie && !load && this.htmlRightBlock()}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(MovieDetails);
