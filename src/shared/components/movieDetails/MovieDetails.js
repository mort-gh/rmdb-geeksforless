// modules
import React, { Component } from 'react';
import { withRouter } from 'react-router';

// services
import fetch from '../../../api/fetcher';

class MovieDetails extends Component {
  state = {
    movie: null,
  };

  async componentDidMount() {
    const { movieID } = this.props.match.params;

    await this.fetchMovie(movieID);
  }

  fetchMovie = async id => {
    const data = await fetch.getMovieByID(id);

    this.setState({ movie: data || null });
  };

  render() {
    const { movie } = this.state;

    return (
      <>
        <h3>Movie details</h3>
        {movie && (
          <div style={{ display: 'flex' }}>
            <img src={movie.Poster} alt={movie.Title} />
            <div style={{ padding: '5rem' }}>
              <p>{movie.Title}</p>
              <p>{movie.Runtime}</p>
              <p>{movie.Genre}</p>
              <p>{movie.Year}</p>
              <p>{movie.Type}</p>
              <p>{movie.Plot}</p>
              <p>{movie.imdbRating}</p>
            </div>
          </div>
        )}
        <br />
      </>
    );
  }
}

export default withRouter(MovieDetails);
