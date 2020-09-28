// modules
import React, { Component } from 'react';

// components
import SliderContainer from 'shared/containers/SliderContainer';
import Title from 'shared/components/title/Title';
import SearchContainer from 'shared/containers/SearchContainer';

class SearchPage extends Component {
  render() {
    return (
      <>
        <header className="container__header">
          <SliderContainer />
          <Title />
        </header>

        <main className="container__main">
          <SearchContainer />
        </main>
      </>
    );
  }
}

export default SearchPage;
