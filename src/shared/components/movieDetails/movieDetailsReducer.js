import { initialState } from './movieDetailsStore';
import {
  FETCH_MOVIE_BY_ID_START,
  FETCH_MOVIE_BY_ID_SUCCESS,
  FETCH_MOVIE_BY_ID_ERROR,
} from '../../../redux_setup/types';

const handlers = {
  [FETCH_MOVIE_BY_ID_START]: state => {
    return { ...state, spinner: true };
  },

  [FETCH_MOVIE_BY_ID_SUCCESS]: (state, { payload }) => {
    return { ...state, movie: payload, spinner: false, isLoaded: true };
  },

  [FETCH_MOVIE_BY_ID_ERROR]: (state, { payload }) => {
    return { ...state, spinner: false, error: payload };
  },

  DEFAULT: state => state,
};

export const movieDetails = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};
