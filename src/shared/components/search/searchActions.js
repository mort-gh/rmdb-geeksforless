import axios from 'axios';

import {
  FETCH_MOVIES_BY_QUERY_ERROR,
  FETCH_MOVIES_BY_QUERY_START,
  FETCH_MOVIES_BY_QUERY_SUCCESS,
  SAVE_URL_PARAMS,
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
        window.scrollTo({ top: 730, behavior: 'smooth' });
      } else dispatch(fetchMoviesError(data.data.Error));
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
    type: FETCH_MOVIES_BY_QUERY_SUCCESS,
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
