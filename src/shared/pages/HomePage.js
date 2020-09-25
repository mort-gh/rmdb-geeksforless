import React, { Component } from 'react';
import SearchHeader from 'shared/components/searchHeader/SearchHeader';
import Search from 'shared/components/search/Search';

class HomePage extends Component {
  render() {
    return (
      <>
        <SearchHeader />
        <Search />
      </>
    );
  }
}

export default HomePage;
