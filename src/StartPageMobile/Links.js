import React from 'react';
import Selected from '../Selected/Selected';
import ContainerDimensions from 'react-container-dimensions';
import './links.css';

const Links = ({ isOpen, toggleLinks }) => (
  <>
    <div
      className={
        isOpen
          ? 'link-mobile__title link-mobile__title--open'
          : 'link-mobile__title'
      }
      onClick={!isOpen ? toggleLinks : null}
    >
      Links
      {isOpen && (
        <ContainerDimensions>
          {({ height }) => (
            <div className="link-mobile__close" onClick={toggleLinks}>
              <Selected height={height} />
            </div>
          )}
        </ContainerDimensions>
      )}
    </div>
    {isOpen && (
      <ul className="link-mobile__wrapper">
        <li className="link-mobile">
          <a
            href="http://studiob.mome.hu"
            target="_blank"
            rel="noopener noreferrer"
          >
            StudioB
          </a>
        </li>
        <li className="link-mobile">
          <a
            href="https://www.facebook.com/viztoronyobuda/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Viztorony
          </a>
        </li>
        <li className="link-mobile">
          <a
            href="http://palma.studio.hu"
            target="_blank"
            rel="noopener noreferrer"
          >
            Palma
          </a>
        </li>
      </ul>
    )}
  </>
);

export default Links;
