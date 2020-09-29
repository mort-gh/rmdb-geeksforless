import axios from 'axios';

import {
  FETCH_SLIDE_MOVIE_DATA_START,
  FETCH_SLIDE_MOVIE_DATA_SUCCESS,
  FETCH_SLIDE_MOVIE_DATA_ERROR,
  SAVE_CUURENT_SLIDE_IDX,
} from '../../../../redux_setup/types';

const API_KEY = `8b47da7b`;
axios.defaults.baseURL = `http://www.omdbapi.com/`;

export function fetchMovieByID(id) {
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
    type: FETCH_SLIDE_MOVIE_DATA_START,
  };
}

export function fetchMovieSuccess(data) {
  return {
    type: FETCH_SLIDE_MOVIE_DATA_SUCCESS,
    payload: data,
  };
}

export function fetchMovieError(error) {
  return {
    type: FETCH_SLIDE_MOVIE_DATA_ERROR,
    error,
  };
}

export function saveCurrentSlideIdx(idx) {
  return {
    type: SAVE_CUURENT_SLIDE_IDX,
    payload: idx,
  };
}
