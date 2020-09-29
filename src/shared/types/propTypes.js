import PropTypes from 'prop-types';

// Slider component
export const SliderPropTypes = {
  slides: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  currentSlideIdx: PropTypes.number.isRequired,
  currentSlideData: PropTypes.object,
  error: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
    PropTypes.oneOf([null]).isRequired,
  ]),
  histoty: PropTypes.object,
  location: PropTypes.object,
};

// Trailer component
export const TrailerPropTypes = {
  histoty: PropTypes.object,
  location: PropTypes.object,
};

// MovieDetails component
export const MovieDetailsPropTypes = {
  movie: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.oneOf([null]).isRequired,
  ]),
  spinner: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
    PropTypes.oneOf([null]).isRequired,
  ]),
  histoty: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object.isRequired,
};

// Search component
export const SearchPropTypes = {
  searchQuery: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  movies: PropTypes.array.isRequired,
  totalResults: PropTypes.number.isRequired,
  spinner: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
    PropTypes.oneOf([null]).isRequired,
  ]),
  histoty: PropTypes.object,
  location: PropTypes.object,
};
