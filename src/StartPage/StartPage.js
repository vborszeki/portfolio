import React from 'react';
import Wrapper from '../Wrapper/Wrapper';
import './startPage.css';
import { photos } from '../mockImages';

const StartPage = () => (
  <Wrapper>
    <div className="start-page-container">
      <ul className="start-page-photos">
        {photos.map(photo => (
          <li key={photo}>
            <img src={photo} alt="" />
          </li>
        ))}
      </ul>
      <nav>
        <ul className="start-page-navigation">
          <li>
            <a href="#/bio">BENETAMAS</a>
          </li>
          <li>
            <a href="#/">WORKS</a>
          </li>
        </ul>
      </nav>
    </div>
  </Wrapper>
);

export default StartPage;
