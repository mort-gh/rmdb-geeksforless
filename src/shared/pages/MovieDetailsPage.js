// modules
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// components
import Trailer from 'shared/components/header/trailer/Trailer';
import MovieDetails from 'shared/components/movieDetails/MovieDetails';
import Title from 'shared/components/title/Title';

class MovieDetailsPage extends Component {
  state = {
    pathLocal: '',
  };

  componentDidMount() {
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
        <Trailer returnToPrevPage={this.returnToPrevPage} />
        <Title />
        <MovieDetails />
      </>
    );
  }
}

export default withRouter(MovieDetailsPage);
