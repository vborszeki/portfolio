import React from 'react';
import ReactDOM from 'react-dom';
import StartPageMobile from './StartPageMobile';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StartPageMobile />, div);
  ReactDOM.unmountComponentAtNode(div);
});
