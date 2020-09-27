import {
  FETCH_MOVIES_BY_QUERY_ERROR,
  FETCH_MOVIES_BY_QUERY_START,
  FETCH_MOVIES_BY_QUERY_SUCCESS,
} from 'redux_setup/types';

import fetch from '../../../api/fetcher';

export function actionFetchMovies() {
  return async dispatch => {
    console.log('inside return actionFetchMovies Fn');

    dispatch(fetchMoviesStart());

    try {
      const data = await fetch.getMoviesBySearchQuery('home');
      dispatch(fetchMoviesSuccess(data.Search));
    } catch (error) {
      dispatch(fetchMoviesError(error));
    }
  };
}

export function fetchMoviesStart() {
  console.log('start actionFetchMovies Fn');

  return {
    type: FETCH_MOVIES_BY_QUERY_START,
  };
}

export function fetchMoviesSuccess(movies) {
  return {
    type: FETCH_MOVIES_BY_QUERY_SUCCESS,
    movies,
  };
}

export function fetchMoviesError(error) {
  return {
    type: FETCH_MOVIES_BY_QUERY_ERROR,
    error,
  };
}
