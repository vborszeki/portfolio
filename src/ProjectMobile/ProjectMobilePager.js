import React from 'react';
import { Link } from 'react-router-dom';
import Selected from '../Selected/Selected';
import './projectMobilePager.css';

const ProjectMobilePager = ({ counter, height }) => (
  <div className="project-mobile-pager">
    <div className="project-mobile-pager--box" style={{ width: height }}>
      {counter}
    </div>
    <Link to="/">
      <Selected height={height} />
    </Link>
  </div>
);

export default ProjectMobilePager;
