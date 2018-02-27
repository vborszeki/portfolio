import React from 'react';
import ReactDOM from 'react-dom';
import Works from './Works';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Works />, div);
  ReactDOM.unmountComponentAtNode(div);
});
