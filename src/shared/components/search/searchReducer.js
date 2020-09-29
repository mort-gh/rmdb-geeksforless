import { initialState } from './searchStore';
import {
  FETCH_MOVIES_BY_QUERY_ERROR,
  FETCH_MOVIES_BY_QUERY_START,
  FETCH_MOVIES_BY_QUERY_SUCCESS,
  SAVE_URL_PARAMS,
} from '../../../redux_setup/types';

export function search(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_MOVIES_BY_QUERY_START:
      return {
        ...state,
        spinner: true,
        error: null
      };

    case FETCH_MOVIES_BY_QUERY_SUCCESS:
      return {
        ...state,
        movies: payload.Search,
        totalResults: payload.totalResults,
        spinner: false,
        isLoaded: true,
      };

    case FETCH_MOVIES_BY_QUERY_ERROR:
      console.log('action ', payload);
      return {
        ...state,
        spinner: false,
        error: payload,
      };

    case SAVE_URL_PARAMS:
      return {
        ...state,
        searchQuery: payload.searchQuery,
        currentPage: payload.currentPage,
      };

    default:
      return state;
  }
}
