// modules
import React, { Component } from 'react';

// components
import Slider from 'shared/components/header/slider/Slider';
import Search from 'shared/components/search/Search';
import Title from 'shared/components/title/Title';

class SearchPage extends Component {
  render() {
    return (
      <>
        <Slider />
        <Title />
        <Search />
      </>
    );
  }
}

export default SearchPage;
