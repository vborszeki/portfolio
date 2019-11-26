import React, { useRef } from 'react';
import { useRect } from '@reach/rect';
import Selected from '../Selected/Selected';
import { links } from '../links';
import './contact.css';

const Contact = ({ isOpen, toggleContact }) => {
  const ref = useRef();
  const rect = useRect(ref);

  return (
    <>
      <div
        className={
          isOpen
            ? 'contact-mobile__title contact-mobile__title--open'
            : 'contact-mobile__title'
        }
        onClick={!isOpen ? toggleContact : null}
        ref={ref}
      >
        Contact
        {isOpen && (
          <div className="contact-mobile__close" onClick={toggleContact}>
            <Selected height={rect && rect.height} />
          </div>
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
};

export default Contact;
