import React, { useState, useEffect } from 'react';
import Works from './Works';
import Contact from './Contact';
import Links from './Links';
import Bio from './Bio';
import EmptyRow from './EmptyRow';
import './startPageMobile.css';

const StartPageMobile = props => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const height = document.querySelector('.start-page-mobile').offsetHeight;
    setHeight(height);
  }, [props]);

  const categories = ['architecture', 'installation', 'object', 'experiment'];

  return (
    <>
      <div className="start-page-mobile">
        {categories.map(category => (
          <Works
            key={category}
            category={category}
            isOpen={
              props[`is${category[0].toUpperCase()}${category.slice(1)}Open`]
            }
            toggleCategory={
              props[`toggle${category[0].toUpperCase()}${category.slice(1)}`]
            }
            projects={props.projects}
          />
        ))}
        <Contact
          isContactOpen={props.isContactOpen}
          toggleContact={props.toggleContact}
        />
        <Links
          isLinksOpen={props.isLinksOpen}
          toggleLinks={props.toggleLinks}
        />
        <Bio />
      </div>
      {height < window.innerHeight &&
        13 - height / (window.innerHeight / 13) > 0 &&
        [...Array(Math.ceil(13 - height / (window.innerHeight / 13)))].map(
          (e, i) => <EmptyRow key={i} />
        )}
    </>
  );
};

export default StartPageMobile;
