import { combineReducers } from 'redux';

// reducers
import { search } from '../shared/components/search/searchReducer';
import { movieDetails } from '../shared/components/movieDetails/movieDetailsReducer';
import { slider } from '../shared/components/header/slider/sliderReducer';

export const rootReducer = combineReducers({
  search,
  movieDetails,
  slider,
});
