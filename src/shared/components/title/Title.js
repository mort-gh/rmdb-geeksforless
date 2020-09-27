// modules
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

// styles
import './title.scss';

class Title extends Component {
  render() {
    const { pathname, search } = this.props.location;

    return (
      <h1 className="title">
        <Link
          className="title__text"
          to={{
            pathname: '/',
            state: { pathLocal: pathname + search },
          }}
        >
          Explore movies & series
        </Link>
      </h1>
    );
  }
}

export default withRouter(Title);
