// modules
import React, { Component } from 'react';
import { withRouter } from 'react-router';

// services
import ReactPlayer from 'react-player/youtube';

// styles
import './trailer.scss';

class Trailer extends Component {
  state = {
    pathLocal: '',
  };

  componentDidMount() {
    this.setPathLocal();
  }

  setPathLocal = () => {
    const { pathLocal } = this.props.location.state;

    this.setState({ pathLocal });
  };

  returnToPrevPage = () => {
    const { history } = this.props;
    const { pathLocal } = this.state;

    history.push(pathLocal);
  };

  render() {
    return (
      <>
        <div className="trailer">
          <ReactPlayer
            style={{ opacity: 0.6 }}
            light={true}
            width="1350px"
            heigh="690px"
            url="https://www.youtube.com/watch?v=KVu3gS7iJu4"
          />

          <button
            onClick={this.returnToPrevPage}
            type="button"
            className="trailer__btn"
          >
            <img
              className="slider__arrow_prev"
              src={require('../../../../assets/svg/arrow.svg')}
              alt="prev"
            />
            <span>Back</span>
          </button>
        </div>
      </>
    );
  }
}

export default withRouter(Trailer);
