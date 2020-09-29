// modules
import React, { Component, lazy } from 'react';

// components
import Title from 'shared/components/title/Title';

// lazy loaders
const LoadSliderContainer = lazy(() =>
  import(/* webpackChunkName: "SliderContainer" */ '../containers/SliderContainer')
);

const LoadSearchContainer = lazy(() =>
  import(/* webpackChunkName: "SearchContainer" */ '../containers/SearchContainer')
);

class SearchPage extends Component {
  render() {
    return (
      <>
        <header className="container__header">
          <LoadSliderContainer />
          <Title />
        </header>

        <main className="container__main">
          <LoadSearchContainer />
        </main>
      </>
    );
  }
}

export default SearchPage;
