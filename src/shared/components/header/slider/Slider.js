// modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

// services
import fetch from '../../../../api/fetcher';
import slidesImgData from '../../../../bgdb.json';

// style
import './Slider.scss';

class Slider extends Component {
  state = {
    slides: [],
    currentSlideIdx: 0,
    currentSlideData: null,
  };

  componentDidMount() {
    this.setState({ slides: slidesImgData });
  }

  async componentDidUpdate() {
    const { slides, currentSlideIdx } = this.state;
    const currentSlideID = slides[currentSlideIdx].imdbID;

    await this.fetchMovie(currentSlideID);
  }

  fetchMovie = async id => {
    const data = await fetch.getMovieByID(id);

    this.setState({ currentSlideData: data });
  };

  sliderHandler = event => {
    const { currentSlideIdx, slides } = this.state;
    const { name } = event.target;

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

    this.setState({ currentSlideIdx: newSliderIdx });
  };

  getCurrentSlideImgURL = () => {
    const { slides, currentSlideIdx } = this.state;
    return slides.length > 0 ? slides[currentSlideIdx].url : '';
  };

  renderSlideTitle = () => {
    const { currentSlideData } = this.state;
    const { location } = this.props;

    return (
      <Link
        to={{
          pathname: `/movies/${currentSlideData.imdbID}`,
          state: {
            pathLocal: location.pathname + location.search,
          },
        }}
      >
        <p>{currentSlideData.Title.toUpperCase()}</p>
        <p>{currentSlideData.Year}</p>
      </Link>
    );
  };

  renderSliderContolls = () => {
    return (
      <div className="slider__controlls">
        <button type="button" name="prevSlide" onClick={this.sliderHandler}>
          prev
        </button>
        <button type="button" name="nextSlide" onClick={this.sliderHandler}>
          next
        </button>
      </div>
    );
  };

  render() {
    const { currentSlideData } = this.state;

    return (
      <>
        {currentSlideData && (
          <div
            className="slider"
            style={{
              backgroundImage: `url(${this.getCurrentSlideImgURL()})`,
            }}
          >
            {currentSlideData && this.renderSlideTitle()}
            {this.renderSliderContolls()}
          </div>
        )}
      </>
    );
  }
}

export default withRouter(Slider);
