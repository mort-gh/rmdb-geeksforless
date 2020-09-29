import axios from 'axios';

import {
  FETCH_MOVIE_BY_ID_START,
  FETCH_MOVIE_BY_ID_SUCCESS,
  FETCH_MOVIE_BY_ID_ERROR,
} from '../../../redux_setup/types';

const API_KEY = `8b47da7b`;
axios.defaults.baseURL = `http://www.omdbapi.com/`;

export function fetchMoviesByID(id) {
  return async dispatch => {
    dispatch(fetchMovieStart());
    try {
      const data = await axios.get(`?apikey=${API_KEY}&i=${id}&plot=full`);

      dispatch(fetchMovieSuccess(data.data));
    } catch (error) {
      dispatch(fetchMovieError(error));
    }
  };
}

export function fetchMovieStart() {
  return {
    type: FETCH_MOVIE_BY_ID_START,
  };
}

export function fetchMovieSuccess(data) {
  return {
    type: FETCH_MOVIE_BY_ID_SUCCESS,
    payload: data,
  };
}

export function fetchMovieError(error) {
  return {
    type: FETCH_MOVIE_BY_ID_ERROR,
    error,
  };
}
