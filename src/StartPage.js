import React from 'react';
import './startPage.css';
const photos = [
  '../images/01.png',
  '../images/02.png',
  '../images/03.png',
  '../images/04.png',
  '../images/05.png',
  '../images/szekusztatas.gif',
  '../images/07.png',
  '../images/08.png'
];

const StartPage = () => (
  <div className="container">
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
          <a href="https://bntms.github.io/portfolio">BENETAMAS</a>
        </li>
        <li>
          <a href="https://bntms.github.io/portfolio">WORKS</a>
        </li>
      </ul>
    </nav>
  </div>
);

export default StartPage;
