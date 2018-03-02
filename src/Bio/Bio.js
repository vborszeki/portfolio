import React from 'react';
import Wrapper from '../Wrapper/Wrapper';
import './bio.css';

const Bio = props => (
  <Wrapper>
    <div className="bio-container">
      <div className="contact-bio">
        <ul className="contact">
          <li className="contact-title">LINKS</li>
          <li>VIZTORONY.HU</li>
          <li>PALMA.STUDIO.HU</li>
          <li>STUDIO.B.HU</li>
          <li className="contact-title">CONTACT</li>
          <li>0036706338750</li>
          <li>INFO@BENETAMAS.COM</li>
          <li>1111 BUDAPEST VASARHELYI PAL U. 10</li>
        </ul>
        <section className="bio">
          <div className="bio-title">
            <p>BIO</p>
            <span className="bio-language" onClick={props.toggleLanguage}>
              ENG / HU
            </span>
          </div>
          <p className="bio-text">
            Lorem ipsum dolor amet next level af iceland everyday carry woke.
            Marfa jianbing hexagon lomo bushwick affogato. Raclette glossier
            green juice, four loko williamsburg gentrify tumeric fingerstache
            shaman. Jianbing banjo occupy twee, tumeric drinking vinegar viral
            enamel pin adaptogen yr small batch. Cardigan viral yuccie,
            knausgaard tumblr skateboard single-origin coffee. Humblebrag
            pitchfork ugh, hot chicken ramps offal kombucha. Gentrify keytar
            deep v flannel hammock salvia church-key vegan cronut farm-to-table
            aesthetic. Tattooed before they sold out fingerstache pitchfork hot
            chicken post-ironic la croix woke tumblr four dollar toast.
            Distillery aesthetic organic try-hard kinfolk literally bushwick
            pour-over etsy post-ironic coloring book. Taxidermy snackwave put a
            bird on it la croix keffiyeh, gentrify ugh chartreuse kitsch forage
            lo-fi waistcoat. Try-hard street art vaporware, cornhole leggings
            kogi tote bag synth flannel ethical. Paleo kombucha blog flannel
            twee portland celiac pinterest jianbing cloud bread. Kombucha cliche
            art party tacos neutra.
          </p>
          <div className="bio-photo" />
        </section>
      </div>
      <nav>
        <ul className="navigation">
          <li>
            <a href="#/">BACK</a>
          </li>
          <li>
            <a href="#/works">WORKS</a>
          </li>
        </ul>
      </nav>
    </div>
  </Wrapper>
);

export default Bio;
