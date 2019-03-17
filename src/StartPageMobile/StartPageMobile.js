import React, { useState, useEffect } from 'react';
import Works from './Works';
import Contact from './Contact';
import Links from './Links';
import Bio from './Bio';
import EmptyRow from './EmptyRow';
import './startPageMobile.css';

const StartPageMobile = ({ projects, isCategoryOpen, toggleCategory }) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const height = document.querySelector('.start-page-mobile').offsetHeight;
    setHeight(height);
  }, [toggleCategory]);

  const categories = ['architecture', 'installation', 'object', 'experiment'];

  return (
    <>
      <div className="start-page-mobile">
        {categories.map(category => (
          <Works
            key={category}
            category={category}
            isOpen={isCategoryOpen[category]}
            toggleCategory={() => toggleCategory(category)}
            projects={projects}
          />
        ))}
        <Contact
          isOpen={isCategoryOpen['contact']}
          toggleContact={() => toggleCategory('contact')}
        />
        <Links
          isOpen={isCategoryOpen['links']}
          toggleLinks={() => toggleCategory('links')}
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
