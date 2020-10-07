import React from 'react';
import ReactDOM from 'react-dom';
import Title from '../shared/components/title/Title.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Title />, div);
});
