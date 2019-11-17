import React from 'react';
import Selected from '../Selected/Selected';
import ContainerDimensions from 'react-container-dimensions';
import { links } from '../links';
import './contact.css';

const Contact = ({ isOpen, toggleContact }) => (
  <>
    <div
      className={
        isOpen
          ? 'contact-mobile__title contact-mobile__title--open'
          : 'contact-mobile__title'
      }
      onClick={!isOpen ? toggleContact : null}
    >
      Contact
      {isOpen && (
        <ContainerDimensions>
          {({ height }) => (
            <div className="contact-mobile__close" onClick={toggleContact}>
              <Selected height={height} />
            </div>
          )}
        </ContainerDimensions>
      )}
    </div>
    {isOpen && (
      <ul className="contact-mobile__wrapper">
        <li className="contact-mobile">
          <a href={`tel:${links.telHref}`}>{links.tel}</a>
        </li>
        <li className="contact-mobile">
          <a href={`mailto:${links.mail}`}>{links.mail}</a>
        </li>
        <li className="contact-mobile">
          <a href={links.maps} target="_blank" rel="noopener noreferrer">
            {links.address}
          </a>
        </li>
        <li className="contact-mobile">
          <a href={links.behance} target="_blank" rel="noopener noreferrer">
            Behance
          </a>
        </li>
      </ul>
    )}
  </>
);

export default Contact;
