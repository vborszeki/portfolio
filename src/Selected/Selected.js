import React from 'react';
import './selected.css';

const Selected = ({ height }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" height={height}>
    <path className="selected" d="M 0,0 L 10,10 M 10,0 L 0,10" />
  </svg>
);

export default Selected;
