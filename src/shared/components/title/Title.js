// modules
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class Title extends Component {
  render() {
    const { pathname, search } = this.props.location;

    return (
      <Link
        to={{
          pathname: '/',
          state: { pathLocal: pathname + search },
        }}
      >
        <h1 style={{ color: 'white' }}>Explore movies & series</h1>
      </Link>
    );
  }
}

export default withRouter(Title);
