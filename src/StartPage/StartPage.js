import React, { useState, useEffect } from 'react';
import Wrapper from '../Wrapper/Wrapper';
import { photosPlaceholder } from './photosPlaceholder';
import './startPage.css';

const StartPage = () => {
  const [photos, setPhotos] = useState(photosPlaceholder);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await fetch('https://www.benetamas.com/api/welcome');
      const photos = await response.json();

      if (!photos.length) return;

      setPhotos(photos);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClick = () => {
    fetchPhotos();
  };

  return (
    <Wrapper>
      <div className="start-page-container">
        <ul className="start-page-photos" onClick={handleClick}>
          {photos.map(photo => (
            <li key={photo.id}>
              <img src={photo.photoUrl} alt="" />
            </li>
          ))}
        </ul>
        <nav>
          <ul className="navigation">
            <li>
              <a href="#/bio">BENETAMAS</a>
            </li>
            <li>
              <a href="#/architecture">Works</a>
            </li>
          </ul>
        </nav>
      </div>
    </Wrapper>
  );
};

export default StartPage;
