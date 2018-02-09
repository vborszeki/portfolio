import React from 'react';
import './startPage.css';
const photos = [
  'https://github.com/bntms/portfolio/blob/master/public/images/01.png?raw=true',
  'https://github.com/bntms/portfolio/blob/master/public/images/02.png?raw=true',
  'https://github.com/bntms/portfolio/blob/master/public/images/03.png?raw=true',
  'https://github.com/bntms/portfolio/blob/master/public/images/04.png?raw=true',
  'https://github.com/bntms/portfolio/blob/master/public/images/05.png?raw=true',
  'https://github.com/bntms/portfolio/blob/master/public/images/szekusztatas.gif?raw=true',
  'https://github.com/bntms/portfolio/blob/master/public/images/07.png?raw=true',
  'https://github.com/bntms/portfolio/blob/master/public/images/08.png?raw=true'
];

const StartPage = () => (
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
);

export default StartPage;
