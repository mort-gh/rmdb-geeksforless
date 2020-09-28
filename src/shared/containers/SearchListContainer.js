// modules
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';

// services
import { fetchMoviesByQuery } from '../components/search/searchActions';

// components
import SearchList from '../components/search/searchList/SearchList';

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
)(SearchList);
