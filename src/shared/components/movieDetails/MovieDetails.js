import React, { Component } from 'react';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import fetch from '../../../fetcher';

class MovieDetails extends Component {
  state = {
    movie: null,
    pathLocal: '',
  };

  componentDidMount() {
    const { movieID } = this.props.match.params;
    const { pathLocal } = this.props.location.state;

    this.fetchMovie(movieID);
    this.setState({
      pathLocal,
    });
  }

  fetchMovie = async id => {
    const data = await fetch.getMovieByID(id);

    this.setState({
      movie: data || null,
    });
  };

  goBack = () => {
    const { history } = this.props;
    const { pathLocal } = this.state;

    history.push(pathLocal);
  };

  render() {
    const { movie } = this.state;
    return (
      <>
        <h3>Movie details</h3>
        <pre>{JSON.stringify(movie, null, 2)}</pre>
        <button type="button" onClick={this.goBack}>
          Back
        </button>
      </>
    );
  }
}

export default withRouter(MovieDetails);
