// modules
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';

// services
import { fetchMoviesByQuery } from '../components/search/searchActions';

// components
import Search from '../components/search/Search';

const mapStateToProps = state => ({
  searchQuery: state.search.searchQuery,
  currentPage: state.search.currentPage,
  movies: state.search.movies,
  totalResults: state.search.totalResults,
  spinner: state.search.spinner,
  isLoaded: state.search.isLoaded,
  error: state.search.error,
});

const mapDispatchToProps = dispatch => ({
  fetchMoviesByQuery: (query, page) =>
    dispatch(fetchMoviesByQuery(query, page)),
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Search);
