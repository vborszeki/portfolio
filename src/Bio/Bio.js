import React from 'react';
import Wrapper from '../Wrapper/Wrapper';
import { withRouter } from 'react-router-dom';
import useBio from './useBio';
import { useLastLocation } from 'react-router-last-location';
import 'focus-visible/dist/focus-visible.js';
import './bio.css';

const Bio = props => {
  const bio = useBio(props.language);
  const lastLocation = useLastLocation();

  const goBack = () => {
    if (lastLocation) {
      props.history.goBack();
    } else {
      props.history.push('/');
    }
  };

  return (
    <Wrapper>
      <div className="bio-container">
        <div className="contact-bio">
          <ul className="contact">
            <li className="contact-title">LINKS</li>
            <li>
              <a
                href="http://studiob.mome.hu"
                target="_blank"
                rel="noopener noreferrer"
              >
                STUDIOB
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/viztoronyobuda/"
                target="_blank"
                rel="noopener noreferrer"
              >
                VIZTORONY
              </a>
            </li>
            <li>
              <a
                href="http://palma.studio.hu"
                target="_blank"
                rel="noopener noreferrer"
              >
                PALMA
              </a>
            </li>
            <li className="contact-title">CONTACT</li>
            <li className="contact-tel">0036706338750</li>
            <li>
              <a href="mailto:info@benetamas.com">INFO@BENETAMAS.COM</a>
            </li>
            <li>
              <a
                href="https://goo.gl/maps/cFDsMZAxuq72"
                target="_blank"
                rel="noopener noreferrer"
              >
                1114 BUDAPEST VASARHELYI PAL U. 10
              </a>
            </li>
          </ul>
          <section className="bio">
            <div className="bio-title">
              <p>BIO</p>
              <span className="bio-language" onClick={props.toggleLanguage}>
                {props.language === 'hu' ? 'EN' : 'HU'}
              </span>
            </div>
            <p className="bio-text">{bio}</p>
            <div className="bio-photo" />
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
                BACK
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </Wrapper>
  );
};

export default withRouter(Bio);
