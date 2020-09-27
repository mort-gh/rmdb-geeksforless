// modules
import React, { Component } from 'react';
import { withRouter } from 'react-router';

// styles
import './title.scss';

class Title extends Component {
  render() {
    return (
      <h1 className="title">
        <a href="/" className="title__text">
          Explore movies & series
        </a>
      </h1>
    );
  }
}

export default withRouter(Title);
