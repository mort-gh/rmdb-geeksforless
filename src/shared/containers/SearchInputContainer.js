// modules
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';

// services
import { fetchMoviesByQuery } from '../components/search/searchActions';

// components
import SearchInput from '../components/search/searchInput/SearchInput';

const mapStateToProps = state => state.search;

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
)(SearchInput);
