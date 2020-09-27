// modules
import React, { Component } from 'react';

// styles
import './searchInput.scss';

class SearchInput extends Component {
  render() {
    const { defaultValue, handleSubmit } = this.props;

    return (
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="form__input"
          type="text"
          defaultValue={defaultValue}
          placeholder="Search ..."
        />
      </form>
    );
  }
}

export default SearchInput;
