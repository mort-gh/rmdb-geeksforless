// modules
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// components
import Trailer from 'shared/components/header/trailer/Trailer';
import MovieDetails from 'shared/components/movieDetails/MovieDetails';
import Title from 'shared/components/title/Title';

class MovieDetailsPage extends Component {
  render() {
    return (
      <>
        <Trailer />
        <Title />
        <MovieDetails />
      </>
    );
  }
}

export default withRouter(MovieDetailsPage);
