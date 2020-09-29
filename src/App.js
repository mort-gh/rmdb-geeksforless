// modules
import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// components
import Loader from 'react-spinners/ScaleLoader';

// lazy loaders
const LoadSearchPage = lazy(() =>
  import(/* webpackChunkName: "SearchPage" */ './shared/pages/SearchPage')
);

const LoadMovieDetailsPage = lazy(() =>
  import(/* webpackChunkName: "MovieDetailsPage" */ './shared/pages/MovieDetailsPage')
);

class App extends Component {
  render() {
    return (
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact component={LoadSearchPage} />
          <Route path="/movie/:movieID" component={LoadMovieDetailsPage} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    );
  }
}

export default App;
