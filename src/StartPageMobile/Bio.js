import React from 'react';
import Selected from '../Selected/Selected';
import ContainerDimensions from 'react-container-dimensions';
import useBio from '../Bio/useBio';
import './bio.css';

const Bio = ({ isOpen, toggleBio, language, toggleLanguage }) => {
  const bio = useBio(language);

  return (
    <>
      <div className="bio-mobile__title" onClick={!isOpen ? toggleBio : null}>
        BENETAMAS
        {isOpen && (
          <ContainerDimensions>
            {({ height }) => (
              <div className="bio-mobile__close" onClick={toggleBio}>
                <Selected height={height} />
              </div>
            )}
          </ContainerDimensions>
        )}
      </div>
      {isOpen && (
        <>
          <div className="bio-mobile__language">
            <span onClick={toggleLanguage}>
              {language === 'hu' ? 'EN' : 'HU'}
            </span>
          </div>
          <p className="bio-mobile__text">{bio}</p>
        </>
      )}
    </>
  );
};

export default Bio;
