import React, { Component } from 'react';
import { withRouter } from 'react-router';
import ReactPlayer from 'react-player/youtube';
import './Trailer.scss';

class Trailer extends Component {
  render() {
    const { back } = this.props;

    return (
      <>
        <div className="trailer">
          <ReactPlayer
            style={{ opacity: '0.6' }}
            light={true}
            width="1350px"
            heigh="690px"
            url="https://www.youtube.com/watch?v=KVu3gS7iJu4"
          />
          <button onClick={back} type="button" className="trailer__btn-back">
            Back
          </button>
        </div>
      </>
    );
  }
}

export default withRouter(Trailer);
