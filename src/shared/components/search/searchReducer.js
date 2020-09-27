import {
  FETCH_MOVIES_BY_QUERY_ERROR,
  FETCH_MOVIES_BY_QUERY_START,
  FETCH_MOVIES_BY_QUERY_SUCCESS,
} from 'redux_setup/types';
import { initialState } from './searchStore';

export function search(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES_BY_QUERY_START:
      return {
        ...state,
        loading: true,
      };

    case FETCH_MOVIES_BY_QUERY_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.movies,
      };

    case FETCH_MOVIES_BY_QUERY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
