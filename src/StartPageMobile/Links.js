import React, { useRef } from 'react';
import { useRect } from '@reach/rect';
import Selected from '../Selected/Selected';
import { links } from '../links';
import './links.css';

const Links = ({ isOpen, toggleLinks }) => {
  const ref = useRef();
  const rect = useRect(ref);

  return (
    <>
      <div
        className={
          isOpen
            ? 'link-mobile__title link-mobile__title--open'
            : 'link-mobile__title'
        }
        onClick={!isOpen ? toggleLinks : null}
        ref={ref}
      >
        Links
        {isOpen && (
          <div className="link-mobile__close" onClick={toggleLinks}>
            <Selected height={rect && rect.height} />
          </div>
        )}
      </div>
      {isOpen && (
        <ul className="link-mobile__wrapper">
          <li className="link-mobile">
            <a href={links.studiob} target="_blank" rel="noopener noreferrer">
              StudioB
            </a>
          </li>
          <li className="link-mobile">
            <a href={links.viztorony} target="_blank" rel="noopener noreferrer">
              Viztorony
            </a>
          </li>
          <li className="link-mobile">
            <a href={links.palma} target="_blank" rel="noopener noreferrer">
              Palma
            </a>
          </li>
        </ul>
      )}
    </>
  );
};

export default Links;
