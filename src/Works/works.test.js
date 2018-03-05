import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import Works from './Works';
import { categoryData } from '../testHelper';

it('renders without crashing', () => {
  const div = document.createElement('div');
  fetch.mockResponse(JSON.stringify({ categoryData }));
  ReactDOM.render(
    <MemoryRouter>
      <Works />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
