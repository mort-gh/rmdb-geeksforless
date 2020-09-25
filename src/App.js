import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from 'shared/pages/HomePage';
import MovieDetails from 'shared/components/movieDetails/MovieDetails';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/movies/:movieID" component={MovieDetails} />
          {/* <Route path="/movies" component={HomePage} /> */}
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
