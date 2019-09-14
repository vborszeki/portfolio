import React from 'react';
import Selected from '../Selected/Selected';
import ContainerDimensions from 'react-container-dimensions';
import './bio.css';

const Bio = ({ isOpen, toggleBio, language, toggleLanguage }) => (
  <>
    <div
      className={
        true ? 'bio-mobile__title bio-mobile__title--open' : 'bio-mobile__title'
      }
      onClick={!isOpen ? toggleBio : null}
    >
      BENETAMAS
      {isOpen && (
        <ContainerDimensions>
          {({ height }) => (
            <div className="bio-mobile__close" onClick={toggleBio}>
              <Selected height={height} />
            </div>
          )}
        </ContainerDimensions>
      )}
    </div>
    {isOpen && (
      <>
        <div className="bio-mobile__language">
          <span onClick={toggleLanguage}>
            {language === 'hu' ? 'EN' : 'HU'}
          </span>
        </div>
        <p className="bio-mobile__text">
          {language === 'hu'
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
      </>
    )}
  </>
);

export default Bio;
