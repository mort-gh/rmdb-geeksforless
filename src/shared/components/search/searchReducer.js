import { initialState } from './searchStore';
import {
  FETCH_MOVIES_BY_QUERY_ERROR,
  FETCH_MOVIES_BY_QUERY_START,
  FETCH_MOVIES_BY_QUERY_SUCCESS,
  FETCH_MOVIES_BY_QUERY_SCROLL,
  SAVE_URL_PARAMS,
  TURN_OFF_SPINNER,
} from '../../../redux_setup/types';

const handlers = {
  [FETCH_MOVIES_BY_QUERY_START]: state => {
    return {
      ...state,
      spinner: true,
      error: null,
    };
  },

  [FETCH_MOVIES_BY_QUERY_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      movies: payload.Search,
      totalResults: +payload.totalResults,
      spinner: false,
      isLoaded: true,
    };
  },

  [FETCH_MOVIES_BY_QUERY_ERROR]: (state, { payload }) => {
    return {
      ...state,
      spinner: false,
      error: payload,
      isLoaded: false,
    };
  },

  [FETCH_MOVIES_BY_QUERY_SCROLL]: (state, { payload }) => {
    return {
      ...state,
      movies: [...state.movies, ...payload.Search],
      totalResults: +payload.totalResults,
      spinner: false,
      isLoaded: true,
    };
  },

  [SAVE_URL_PARAMS]: (state, { payload }) => {
    return {
      ...state,
      searchQuery: payload.searchQuery,
      currentPage: +payload.currentPage,
    };
  },

  [TURN_OFF_SPINNER]: state => {
    return {
      ...state,
      spinner: false,
    };
  },

  DEFAULT: state => state,
};

export const search = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};
