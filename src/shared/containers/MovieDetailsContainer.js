// modules
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';

// services
import { fetchMoviesByID } from '../components/movieDetails/movieDetailsActions';

// components
import MovieDetails from '../components/movieDetails/MovieDetails';

const mapStateToProps = state => ({
  movie: state.movieDetails.movie,
  spinner: state.movieDetails.spinner,
  isLoaded: state.movieDetails.isLoaded,
  error: state.movieDetails.error,
});

const mapDispatchToProps = dispatch => ({
  fetchMoviesByID: id => dispatch(fetchMoviesByID(id)),
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(MovieDetails);
