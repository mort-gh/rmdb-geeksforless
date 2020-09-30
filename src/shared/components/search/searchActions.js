import axios from 'axios';

import {
  FETCH_MOVIES_BY_QUERY_ERROR,
  FETCH_MOVIES_BY_QUERY_START,
  FETCH_MOVIES_BY_QUERY_SUCCESS,
  FETCH_MOVIES_BY_QUERY_SCROLL,
  SAVE_URL_PARAMS,
  TURN_OFF_SPINNER,
} from '../../../redux_setup/types';

const API_KEY = `8b47da7b`;
axios.defaults.baseURL = `http://www.omdbapi.com/`;

export function fetchMoviesByQuery(query, page) {
  return async dispatch => {
    dispatch(fetchMoviesStart());
    dispatch(saveURLparams(query, page));

    try {
      let data;
      if (query.length >= 3) {
        data = await axios.get(`?apikey=${API_KEY}&s=${query}&page=${page}`);
      }

      if (data && !data.data.Error) {
        dispatch(fetchMoviesSuccess(data.data));
      } else {
        dispatch(fetchMoviesError(data.data.Error));
      }

      window.scrollTo({ top: 730, behavior: 'smooth' });
    } catch (error) {
      dispatch(fetchMoviesError(error));
    }
  };
}

export function fetchMoviesByScroll(query, page) {
  return async dispatch => {
    dispatch(fetchMoviesStart());
    dispatch(saveURLparams(query, page));

    try {
      const data = await axios.get(
        `?apikey=${API_KEY}&s=${query}&page=${page}`
      );

      if (data && !data.data.Error) {
        dispatch(fetchMoviesScrollSuccess(data.data));
      } else {
        dispatch(turnOffSpinner());
      }
    } catch (error) {
      dispatch(fetchMoviesError(error));
    }
  };
}

export function fetchMoviesStart() {
  return {
    type: FETCH_MOVIES_BY_QUERY_START,
  };
}

export function fetchMoviesSuccess(data) {
  return {
    type: FETCH_MOVIES_BY_QUERY_SUCCESS || FETCH_MOVIES_BY_QUERY_SCROLL,
    payload: data,
  };
}

export function fetchMoviesScrollSuccess(data) {
  return {
    type: FETCH_MOVIES_BY_QUERY_SCROLL,
    payload: data,
  };
}

export function fetchMoviesError(error) {
  return {
    type: FETCH_MOVIES_BY_QUERY_ERROR,
    payload: error,
  };
}

export function saveURLparams(query, page) {
  return {
    type: SAVE_URL_PARAMS,
    payload: { searchQuery: query, currentPage: page },
  };
}

export function turnOffSpinner() {
  return {
    type: TURN_OFF_SPINNER,
  };
}
