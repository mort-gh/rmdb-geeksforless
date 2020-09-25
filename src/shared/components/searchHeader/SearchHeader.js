import React, { Component } from 'react';
import fetch from '../../../fetcher';
import bgdb from '../../../bgdb.json';
import './SearchHeader.scss';

class SearchHeader extends Component {
  state = {
    movies: [],
    currentSlideID: 'tt7131622',
    currentSlide: {},
  };

  async componentDidMount() {}

  fetchMovie = async id => {
    const data = await fetch.getMovieByID(id);
    return data;
  };

  handleClickSlider = () => {};

  render() {
    const { movies } = this.state;
    const url = movies.length > 0 && movies[0]['url'];

    return (
      <div className="slider" style={{ backgroundImage: `url(${url})` || '' }}>
        <div className="slider__controlls">
          <button type="button" onClick={this.handleClickSlider}>
            prev
          </button>
          <button type="button" onClick={this.handleClickSlider}>
            next
          </button>
        </div>
      </div>
    );
  }
}

export default SearchHeader;
