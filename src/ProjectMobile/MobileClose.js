import React from 'react';
import { Link } from 'react-router-dom';
import Selected from '../Selected/Selected';
import './mobileClose.css';

const MobileClose = ({ height }) => (
  <div className="project-mobile-close">
    <Link to="/">
      <Selected height={height} />
    </Link>
  </div>
);

export default MobileClose;
