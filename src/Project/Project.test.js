import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import Project from './Project';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Project />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
