import React from 'react';
import { Link } from 'react-router-dom';
import Selected from '../Selected/Selected';
import './projectPager.css';

const ProjectPager = ({ counter, height, category, project }) => (
  <div className="project-pager">
    {project.nextProject && (
      <>
        <div className="project-pager--box" style={{ width: height }}>
          <Link to={`/${category}/${project.previousProject}`}>Prev</Link>
        </div>
        <div
          className="project-pager--box project-pager--counter"
          style={{ width: height }}
        >
          {counter}
        </div>
        <div className="project-pager--box" style={{ width: height }}>
          <Link to={`/${category}/${project.nextProject}`}>Next</Link>
        </div>
      </>
    )}
    <div className="project-pager--box project-pager--close">
      <Link to={`/${category}`}>
        <Selected height={height} />
      </Link>
    </div>
  </div>
);

export default ProjectPager;
