import React, { Component } from 'react';
import Slider from 'shared/components/header/slider/Slider';
import Search from 'shared/components/search/Search';

class SearchPage extends Component {
  render() {
    return (
      <>
        <Slider />
        <Search />
      </>
    );
  }
}

export default SearchPage;
