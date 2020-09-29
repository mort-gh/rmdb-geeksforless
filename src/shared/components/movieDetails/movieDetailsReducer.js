import { initialState } from './movieDetailsStore';
import {
  FETCH_MOVIE_BY_ID_START,
  FETCH_MOVIE_BY_ID_SUCCESS,
  FETCH_MOVIE_BY_ID_ERROR,
} from '../../../redux_setup/types';

export function movieDetails(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_MOVIE_BY_ID_START:
      return {
        ...state,
        spinner: true,
      };

    case FETCH_MOVIE_BY_ID_SUCCESS:
      return {
        ...state,
        movie: payload,
        spinner: false,
        isLoaded: true,
      };

    case FETCH_MOVIE_BY_ID_ERROR:
      return {
        ...state,
        spinner: false,
        error: payload,
      };

    default:
      return state;
  }
}
