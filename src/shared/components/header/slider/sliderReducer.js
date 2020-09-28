import { initialState } from './sliderStore';
import {
  FETCH_SLIDE_MOVIE_DATA_START,
  FETCH_SLIDE_MOVIE_DATA_SUCCESS,
  FETCH_SLIDE_MOVIE_DATA_ERROR,
  SAVE_CUURENT_SLIDE_IDX,
} from 'redux_setup/types';

export function slider(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_SLIDE_MOVIE_DATA_START:
      return {
        ...state,
      };

    case FETCH_SLIDE_MOVIE_DATA_SUCCESS:
      return {
        ...state,
        currentSlideData: payload,
        isLoaded: true,
      };

    case FETCH_SLIDE_MOVIE_DATA_ERROR:
      return {
        ...state,
        error: payload,
        isLoaded: false,
      };

    case SAVE_CUURENT_SLIDE_IDX:
      return {
        ...state,
        currentSlideIdx: payload,
      };

    default:
      return state;
  }
}
