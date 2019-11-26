import React, { useRef } from 'react';
import { useRect } from '@reach/rect';
import Selected from '../Selected/Selected';
import useBio from '../Bio/useBio';
import './bio.css';

const Bio = ({ isOpen, toggleBio, language, toggleLanguage }) => {
  const bio = useBio(language);
  const ref = useRef();
  const rect = useRect(ref);

  return (
    <>
      <div
        className="bio-mobile__title"
        onClick={!isOpen ? toggleBio : null}
        ref={ref}
      >
        BENETAMAS
        {isOpen && (
          <div className="bio-mobile__close" onClick={toggleBio}>
            <Selected height={rect && rect.height} />
          </div>
        )}
      </div>
      {isOpen && (
        <>
          <div className="bio-mobile__language">
            <span onClick={toggleLanguage}>
              {language === 'hu' ? 'en' : 'hu'}
            </span>
          </div>
          <p className="bio-mobile__text">{bio}</p>
        </>
      )}
    </>
  );
};

export default Bio;
