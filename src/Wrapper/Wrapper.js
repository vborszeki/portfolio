import React from 'react';
import './wrapper.css';

const Wrapper = ({ children }) => (
  <div className="wrapper-container">
    <div className="wrapper">{children}</div>
  </div>
);

export default Wrapper;
