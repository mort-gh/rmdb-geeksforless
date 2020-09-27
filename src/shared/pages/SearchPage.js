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
        <header className="container__header">
          <Slider />
          <Title />
        </header>

        <main className="container__main">
          <Search />
        </main>
      </>
    );
  }
}

export default SearchPage;
