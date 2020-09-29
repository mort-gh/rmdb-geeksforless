import { initialState } from './sliderStore';
import {
  FETCH_SLIDE_MOVIE_DATA_START,
  FETCH_SLIDE_MOVIE_DATA_SUCCESS,
  FETCH_SLIDE_MOVIE_DATA_ERROR,
  SAVE_CUURENT_SLIDE_IDX,
} from '../../../../redux_setup/types';

const handlers = {
  [FETCH_SLIDE_MOVIE_DATA_START]: state => {
    return { ...state };
  },

  [FETCH_SLIDE_MOVIE_DATA_SUCCESS]: (state, { payload }) => {
    return { ...state, currentSlideData: payload, isLoaded: true };
  },

  [FETCH_SLIDE_MOVIE_DATA_ERROR]: (state, { payload }) => {
    return { ...state, error: payload, isLoaded: false };
  },

  [SAVE_CUURENT_SLIDE_IDX]: (state, { payload }) => {
    return { ...state, currentSlideIdx: payload };
  },

  DEFAULT: state => state,
};

export const slider = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};
