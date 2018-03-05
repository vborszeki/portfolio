import React from 'react';
import ReactDOM from 'react-dom';
import StartPage from './StartPage';
import { startPagePhotos } from '../testHelper';

it('renders without crashing', () => {
  const div = document.createElement('div');
  fetch.mockResponse(JSON.stringify({ startPagePhotos }));
  ReactDOM.render(<StartPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
