// modules
import React, { Component } from 'react';

// types
import { SliderPropTypes } from '../../../types/propTypes';

// style
import './slider.scss';

class Slider extends Component {
  componentDidMount() {
    const { fetchMovieByID, slides } = this.props;
    fetchMovieByID(slides[0].imdbID);
  }

  sliderHandler = event => {
    const {
      currentSlideIdx,
      slides,
      saveCurrentSlideIdx,
      fetchMovieByID,
    } = this.props;

    const { name } = event.currentTarget;

    const isNextBtn = name === 'nextSlide';
    const isPrevBtn = name === 'prevSlide';

    const totalItems = slides.length;
    const firstSlideIdx = 0;
    const lastSlideIdx = totalItems - 1;
    const isTheLastSlide = currentSlideIdx === totalItems - 1;
    const isTheFirstSlide = currentSlideIdx === firstSlideIdx;

    let newSliderIdx;

    if (isNextBtn) {
      newSliderIdx = isTheLastSlide ? firstSlideIdx : currentSlideIdx + 1;
    }

    if (isPrevBtn) {
      newSliderIdx = isTheFirstSlide ? lastSlideIdx : currentSlideIdx - 1;
    }

    const newSlideID = slides[newSliderIdx].imdbID;

    saveCurrentSlideIdx(newSliderIdx);
    fetchMovieByID(newSlideID);
  };

  getSliderBgImg = () => {
    const { slides, currentSlideIdx } = this.props;
    const noSliderImg = require('../../../../assets/images/slider_no_img.jpg');

    return slides.length > 0 ? slides[currentSlideIdx].url : noSliderImg;
  };

  htmlSlideInfo = () => {
    const { Year, Title } = this.props.currentSlideData;

    return (
      <div className="slider__info move">
        <span className="slider__info_year">{Year}</span>
        <span className="slider__info_title">{Title}</span>
      </div>
    );
  };

  htmlSliderContolls = () => {
    return (
      <div className="slider__controlls move">
        <button
          type="button"
          name="prevSlide"
          className="slider__controlls_prev"
          onClick={this.sliderHandler}
        >
          <img
            className="slider__arrow_prev"
            src={require('../../../../assets/svg/arrow.svg')}
            alt="prev"
          />
          <span>Prev</span>
        </button>
        <button
          type="button"
          name="nextSlide"
          className="slider__controlls_next"
          onClick={this.sliderHandler}
        >
          <span>Next</span>
          <img
            className="slider__arrow_next"
            src={require('../../../../assets/svg/arrow.svg')}
            alt="prev"
          />
        </button>
      </div>
    );
  };

  render() {
    const { isLoaded } = this.props;

    const backgroundImgOptions = {
      backgroundImage: `url(${this.getSliderBgImg()})`,
    };

    return (
      <>
        <>
          {isLoaded && (
            <div className="slider move" style={backgroundImgOptions}>
              {this.htmlSlideInfo()}
              {this.htmlSliderContolls()}
            </div>
          )}
        </>
      </>
    );
  }
}

export default Slider;

Slider.propTypes = SliderPropTypes;
