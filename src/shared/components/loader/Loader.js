// modules
import React from 'react';

// services
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ScaleLoader';

const override = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  margin: 0 auto;
  border-color: red;
  z-index: 20;
`;

const styles = {
  sweetLoading: {
    background: 'rgba(0, 0, 0, 0.7)',
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
  },
};

export class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    const { loading } = this.state;

    return (
      <div style={styles.sweetLoading}>
        <ClipLoader
          css={override}
          size={30}
          color={'#878787'}
          loading={loading}
        />
      </div>
    );
  }
}
