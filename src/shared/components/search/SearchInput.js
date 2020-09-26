import React, { Component } from 'react';

class SearchInput extends Component {
  render() {
    const { defaultValue, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <input type="search" defaultValue={defaultValue} />
        <button type="submit">go</button>
      </form>
    );
  }
}

export default SearchInput;
