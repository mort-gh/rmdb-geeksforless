// modules
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';

// services
import {
  fetchMovieByID,
  saveCurrentSlideIdx,
} from '../components/header/slider/sliderActions';

// components
import Slider from '../components/header/slider/Slider';

const mapStateToProps = state => ({
  slides: state.slider.slides,
  isLoaded: state.slider.isLoaded,
  currentSlideIdx: state.slider.currentSlideIdx,
  currentSlideData: state.slider.currentSlideData,
  error: state.slider.error,
});

const mapDispatchToProps = dispatch => ({
  fetchMovieByID: id => dispatch(fetchMovieByID(id)),
  saveCurrentSlideIdx: idx => dispatch(saveCurrentSlideIdx(idx)),
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Slider);
