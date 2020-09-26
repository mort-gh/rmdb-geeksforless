import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SearchPage from 'shared/pages/SearchPage';
import MovieDetailsPage from 'shared/pages/MovieDetailsPage';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route path="/" exact component={SearchPage} />
          <Route path="/movie/:movieID" component={MovieDetailsPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
