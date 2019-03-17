import React from 'react';
import { Link } from 'react-router-dom';
import Selected from '../Selected/Selected';
import ContainerDimensions from 'react-container-dimensions';
import './works.css';

const Works = ({ projects, category, isOpen, toggleCategory }) => (
  <>
    <div
      className={
        isOpen
          ? 'works-mobile__title works-mobile__title--open'
          : 'works-mobile__title'
      }
      onClick={!isOpen ? toggleCategory : null}
    >
      {category}
      {isOpen && (
        <ContainerDimensions>
          {({ height }) => (
            <div className="works-mobile__close" onClick={toggleCategory}>
              <Selected height={height} />
            </div>
          )}
        </ContainerDimensions>
      )}
    </div>
    {isOpen && (
      <ul className="works-mobile__wrapper">
        {projects[category].map(project => (
          <li key={project.id} className="works-mobile">
            <Link to={`/${category}/${project.friendlyUrlTitle}`}>
              {project.title}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </>
);

export default Works;
