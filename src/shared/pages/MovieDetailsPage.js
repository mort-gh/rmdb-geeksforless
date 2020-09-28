// modules
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// components
import Trailer from 'shared/components/header/trailer/Trailer';
import MovieDetailsContainer from 'shared/containers/MovieDetailsContainer';

class MovieDetailsPage extends Component {
  render() {
    return (
      <>
        <header className="container__header">
          <Trailer />
        </header>

        <main className="container__main">
          <MovieDetailsContainer />
        </main>
      </>
    );
  }
}

export default withRouter(MovieDetailsPage);
