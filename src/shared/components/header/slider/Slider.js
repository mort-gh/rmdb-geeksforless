// modules
import React, { Component } from 'react';
import { withRouter } from 'react-router';

// services
import fetch from '../../../../api/fetcher';
import slidesImgData from '../../../../bgdb.json';

// style
import './slider.scss';

class Slider extends Component {
  state = {
    slides: [],
    currentSlideIdx: 0,
    currentSlideData: null,
  };

  componentDidMount() {
    this.setState({ slides: slidesImgData });
    this.fetchMovie(slidesImgData[0].imdbID);
  }

  fetchMovie = async id => {
    try {
      const data = await fetch.getMovieByID(id);

      this.setState({
        currentSlideData: data,
      });
    } catch (error) {
      console.error('Fetch error in Slider component', error);
      throw new Error(error);
    }
  };

  sliderHandler = event => {
    const { currentSlideIdx, slides } = this.state;
    const { name } = event.currentTarget;

    const isTheNextSlide = name === 'nextSlide';
    const isThePrevSlide = name === 'prevSlide';

    const totalItems = slides.length;
    const firstSlideIdx = 0;
    const lastSlideIdx = totalItems - 1;
    const isTheLastSlide = currentSlideIdx === totalItems - 1;
    const isTheFirstSlide = currentSlideIdx === firstSlideIdx;

    let newSliderIdx;

    if (isTheNextSlide) {
      newSliderIdx = isTheLastSlide ? firstSlideIdx : currentSlideIdx + 1;
    }

    if (isThePrevSlide) {
      newSliderIdx = isTheFirstSlide ? lastSlideIdx : currentSlideIdx - 1;
    }

    this.setState({
      currentSlideIdx: newSliderIdx,
    });

    const newSlideID = slides[newSliderIdx].imdbID;
    this.fetchMovie(newSlideID);
  };

  getCurrentSlideImgURL = () => {
    const { slides, currentSlideIdx } = this.state;
    return slides.length > 0 ? slides[currentSlideIdx].url : '';
  };

  htmlSlideInfo = () => {
    const { currentSlideData } = this.state;

    return (
      <div className="slider__info">
        <span className="slider__info_year">{currentSlideData.Year}</span>
        <span className="slider__info_title">{currentSlideData.Title}</span>
      </div>
    );
  };

  htmlSliderContolls = () => {
    return (
      <div className="slider__controlls">
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
    const { currentSlideData } = this.state;

    return (
      <>
        {currentSlideData && (
          <>
            <div
              className="slider"
              style={{
                backgroundImage: `url(${this.getCurrentSlideImgURL()})`,
              }}
            >
              {this.htmlSlideInfo()}
              {this.htmlSliderContolls()}
            </div>
          </>
        )}
      </>
    );
  }
}

export default withRouter(Slider);
