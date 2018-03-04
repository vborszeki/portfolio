import React from 'react';
import Wrapper from '../Wrapper/Wrapper';
import './project.css';

const Project = props => {
  return (
    <Wrapper>
      <div className="project-container">
        <div className="project-content">
          <div className="project-photos" />
          <div className="project-details">
            <div className="project-description" />
            <ul className="project-category-list">
              <li className="architecture">ARCHITECTURE</li>
              <li className="installation">INSTALLATION</li>
              <li className="object">OBJECT</li>
              <li className="experiment">EXPERIMENT</li>
            </ul>
          </div>
        </div>
        <nav>
          <ul className="navigation">
            <li>
              <a href="#/bio">BENETAMAS</a>
            </li>
            <li>
              <a href={`#/category/${props.category}`}>BACK</a>
            </li>
          </ul>
        </nav>
      </div>
    </Wrapper>
  );
};

export default Project;
