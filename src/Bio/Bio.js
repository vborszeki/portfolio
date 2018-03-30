import React from 'react';
import Wrapper from '../Wrapper/Wrapper';
import './bio.css';

const Bio = props => (
  <Wrapper>
    <div className="bio-container">
      <div className="contact-bio">
        <ul className="contact">
          <li className="contact-title">LINKS</li>
          <li>
            <a href="http://viztorony.io">VIZTORONY.IO</a>
          </li>
          <li>
            <a href="http://palma.studio.hu">PALMA.STUDIO.HU</a>
          </li>
          <li>
            <a href="http://studiob.mome.hu">STUDIOB.MOME.HU</a>
          </li>
          <li className="contact-title">CONTACT</li>
          <li>0036706338750</li>
          <li>
            <a href="mailto:info@benetamas.com">INFO@BENETAMAS.COM</a>
          </li>
          <li>1114 BUDAPEST VASARHELYI PAL U. 10</li>
        </ul>
        <section className="bio">
          <div className="bio-title">
            <p>BIO</p>
            <span className="bio-language" onClick={props.toggleLanguage}>
              ENG / HU
            </span>
          </div>
          <p className="bio-text">
            {props.language === 'hu'
              ? `Lorem ipsum dolor amet next level af iceland everyday carry woke.
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
            art party tacos neutra.`
              : `Pop-up green juice marfa, XOXO vinyl banjo retro beard. Authentic
               jean shorts palo santo, 90's church-key man bun echo park meditation
               umami hoodie kombucha nulla. 90's actually schlitz letterpress
               laboris echo park artisan palo santo trust fund la croix. Pariatur
               intelligentsia VHS sint, roof party portland banjo lo-fi et pinterest
               tote bag flannel. Cold-pressed et adipisicing XOXO blue bottle,
               vaporware culpa cliche enim kombucha hella lorem small batch ad.
               Laboris mustache whatever, selfies humblebrag art party quinoa cray
               cupidatat umami. Actually pabst umami, etsy tacos adaptogen paleo
               mollit selvage irony glossier jianbing knausgaard post-ironic ut.
               Nostrud qui synth echo park chia authentic. Aliqua vice pok pok tattooed.
               Raclette synth adaptogen try-hard whatever esse. Bicycle rights woke
               flannel ipsum kale chips vaporware seitan culpa heirloom bushwick.
               Fanny pack direct trade church-key tumblr mlkshk enamel pin.
               Cronut velit shabby chic, meditation organic jean shorts culpa.`}
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
            <a href="#/architecture">WORKS</a>
          </li>
        </ul>
      </nav>
    </div>
  </Wrapper>
);

export default Bio;
