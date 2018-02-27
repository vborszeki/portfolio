import React from 'react';
import Wrapper from '../Wrapper/Wrapper';
import './works.css';
import { photos } from '../mockImages';

const Works = () => {
  const workPhotos = [...photos, ...photos];

  return (
    <Wrapper>
      <div className="works-container">
        <div className="works-content">
          <ul className="works-photos">
            {workPhotos.map((photo, i) => (
              <li key={i}>
                <img src={photo} alt="" />
              </li>
            ))}
          </ul>
          <div className="works-list">
            <ul className="works-project-list">
              <li>D 365 DAYS</li>
              <li>FURNANCE</li>
              <li>MKE</li>
              <li>DESIGN WEEK</li>
            </ul>
            <ul className="works-category-list">
              <li>ARCHITECTURE</li>
              <li>INSTALLATION</li>
              <li>OBJECT</li>
              <li>EXPERIMENT</li>
            </ul>
          </div>
        </div>
        <nav>
          <ul className="navigation">
            <li>
              <a href="#/bio">BENETAMAS</a>
            </li>
            <li>
              <a href="#/">BACK</a>
            </li>
          </ul>
        </nav>
      </div>
    </Wrapper>
  );
};

export default Works;
