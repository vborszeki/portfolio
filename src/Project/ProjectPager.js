import React from 'react';
import Selected from '../Selected/Selected';
import './projectPager.css';

const ProjectPager = ({ counter, height }) => (
  <div className="project-pager">
    <div className="project-pager--box" style={{ width: height }}>
      PREV
    </div>
    <div className="project-pager--box" style={{ width: height }}>
      {counter}
    </div>
    <div className="project-pager--box" style={{ width: height }}>
      NEXT
    </div>
    <Selected height={height} />
  </div>
);

export default ProjectPager;
