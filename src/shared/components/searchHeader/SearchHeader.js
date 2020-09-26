import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import fetch from '../../../fetcher';
import bgdb from '../../../bgdb.json';
import './SearchHeader.scss';

class SearchHeader extends Component {
  state = {
    slides: [],
    currentSlideIdx: 0,
    currentSlideData: null,
  };

  async componentDidMount() {
    this.setState({
      slides: bgdb,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    const { slides, currentSlideIdx } = this.state;
    const currentSlideID = slides[currentSlideIdx].imdbID;
    const data = await this.fetchMovie(currentSlideID);

    this.setState({
      currentSlideData: data,
    });
  }

  fetchMovie = async id => {
    const data = await fetch.getMovieByID(id);
    return data;
  };

  handleClickSlider = event => {
    const isTheNextSlide = event.target.name === 'nextSlide';
    const isThePrevSlide = event.target.name === 'prevSlide';
    const { currentSlideIdx, slides } = this.state;
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

  getCurrentSlideURL = () => {
    const { slides, currentSlideIdx } = this.state;

    if (slides.length > 0) {
      return slides[currentSlideIdx].url;
    } else {
      return '';
    }
  };

  render() {
    const { currentSlideData } = this.state;

    return (
      <>
        {currentSlideData && (
          <div
            className="slider"
            style={{
              backgroundImage: `url(${this.getCurrentSlideURL()})` || '',
            }}
          >
            <div>
              {currentSlideData && (
                <Link
                  to={{
                    pathname: `/movies/${currentSlideData.imdbID}`,
                    state: {
                      pathLocal:
                        this.props.location.pathname +
                        this.props.location.search,
                    },
                  }}
                >
                  <p>{currentSlideData.Title.toUpperCase()}</p>
                  <p>{currentSlideData.Year}</p>
                </Link>
              )}
            </div>
            <div className="slider__controlls">
              <button
                type="button"
                name="prevSlide"
                onClick={this.handleClickSlider}
              >
                prev
              </button>
              <button
                type="button"
                name="nextSlide"
                onClick={this.handleClickSlider}
              >
                next
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default withRouter(SearchHeader);
