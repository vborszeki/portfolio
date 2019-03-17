import React from 'react';
import Selected from '../Selected/Selected';
import ContainerDimensions from 'react-container-dimensions';
import './contact.css';

const Contact = ({ isContactOpen, toggleContact }) => (
  <>
    <div
      className={
        isContactOpen
          ? 'contact-mobile__title contact-mobile__title--open'
          : 'contact-mobile__title'
      }
      onClick={!isContactOpen ? toggleContact : null}
    >
      Contact
      {isContactOpen && (
        <ContainerDimensions>
          {({ height }) => (
            <div className="contact-mobile__close" onClick={toggleContact}>
              <Selected height={height} />
            </div>
          )}
        </ContainerDimensions>
      )}
    </div>
    {isContactOpen && (
      <ul className="contact-mobile__wrapper">
        <li className="contact-mobile">
          <a href="tel:+36-70-633-8750">0036706338750</a>
        </li>
        <li className="contact-mobile">
          <a href="mailto:info@benetamas.com">info@benetamas.com</a>
        </li>
        <li className="contact-mobile">
          <a
            href="https://goo.gl/maps/cFDsMZAxuq72"
            target="_blank"
            rel="noopener noreferrer"
          >
            1114 Budapest Vasarhelyi Pal u. 10
          </a>
        </li>
      </ul>
    )}
  </>
);

export default Contact;
