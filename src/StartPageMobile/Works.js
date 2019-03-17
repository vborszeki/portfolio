import React from 'react';
import { Link } from 'react-router-dom';
import Selected from '../Selected/Selected';
import ContainerDimensions from 'react-container-dimensions';
import './works.css';

const Works = props => {
  return (
    <>
      <div
        className={
          props.isOpen
            ? 'works-mobile__title works-mobile__title--open'
            : 'works-mobile__title'
        }
        onClick={!props.isOpen ? props.toggleCategory : null}
      >
        {props.category}
        {props.isOpen && (
          <ContainerDimensions>
            {({ height }) => (
              <div
                className="works-mobile__close"
                onClick={props.toggleCategory}
              >
                <Selected height={height} />
              </div>
            )}
          </ContainerDimensions>
        )}
      </div>
      {props.isOpen && (
        <ul className="works-mobile__wrapper">
          {props.projects[props.category].map(project => (
            <li key={project.id} className="works-mobile">
              <Link to={`/${props.category}/${project.friendlyUrlTitle}`}>
                {project.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Works;
