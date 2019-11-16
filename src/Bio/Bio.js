import React, { useState } from 'react';
import Wrapper from '../Wrapper/Wrapper';
import { withRouter } from 'react-router-dom';
import useBio from './useBio';
import { useLastLocation } from 'react-router-last-location';
import { links } from '../links';
import 'focus-visible/dist/focus-visible.js';
import './bio.css';

const Bio = props => {
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const bio = useBio(props.language);
  const lastLocation = useLastLocation();

  const goBack = () => {
    if (lastLocation) {
      props.history.goBack();
    } else {
      props.history.push('/');
    }
  };

  const handeBioClick = () => {
    if (window.getSelection().toString()) return;
    setIsBioExpanded(!isBioExpanded);
  };

  return (
    <Wrapper>
      <div className="bio-container">
        <div className="contact-bio">
          <ul className="contact">
            <li className="contact-title">Links</li>
            <li>
              <a href={links.studiob} target="_blank" rel="noopener noreferrer">
                StudioB
              </a>
            </li>
            <li>
              <a
                href={links.viztorony}
                target="_blank"
                rel="noopener noreferrer"
              >
                Viztorony
              </a>
            </li>
            <li>
              <a href={links.palma} target="_blank" rel="noopener noreferrer">
                Palma
              </a>
            </li>
            <li className="contact-title">Contact</li>
            <li className="contact-tel">{links.tel}</li>
            <li>
              <a href={`mailto:${links.mail}`}>{links.mail}</a>
            </li>
            <li>
              <a href={links.maps} target="_blank" rel="noopener noreferrer">
                {links.address}
              </a>
            </li>
          </ul>
          <section className={isBioExpanded ? 'bio--expanded' : 'bio'}>
            <div className="bio-title">
              <p>Bio</p>
              <span className="bio-language" onClick={props.toggleLanguage}>
                {props.language === 'hu' ? 'en' : 'hu'}
              </span>
            </div>
            <p
              className={isBioExpanded ? 'bio-text--expanded' : 'bio-text'}
              onClick={handeBioClick}
            >
              {bio}
            </p>
            {!isBioExpanded && <div className="bio-photo" />}
          </section>
        </div>
        <nav>
          <ul className="navigation">
            <li>
              <span
                role="button"
                tabIndex="0"
                onClick={goBack}
                onKeyPress={goBack}
                className="js-focus-visible"
              >
                Back
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </Wrapper>
  );
};

export default withRouter(Bio);
