import React, { Component } from 'react';
import Trailer from 'shared/components/header/trailer/Trailer';
import MovieDetails from 'shared/components/movieDetails/MovieDetails';

class MovieDetailsPage extends Component {
  state = {
    pathLocal: '',
  };

  async componentDidMount() {
    this.setPathLocal();
  }

  setPathLocal = () => {
    const { pathLocal } = this.props.location.state;
    this.setState({ pathLocal });
  };

  returnToPrevPage = () => {
    const { history } = this.props;
    const { pathLocal } = this.state;
    history.push(pathLocal);
  };

  render() {
    return (
      <>
        <Trailer back={this.returnToPrevPage} />
        <MovieDetails />
      </>
    );
  }
}

export default MovieDetailsPage;
