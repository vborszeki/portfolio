import React, { useState, useEffect } from 'react';
import Works from './Works';
import Contact from './Contact';
import Links from './Links';
import Bio from './Bio';
import EmptyRows from './EmptyRows';
import './startPageMobile.css';

const StartPageMobile = ({
  projects,
  isCategoryOpen,
  toggleCategory,
  language,
  toggleLanguage
}) => {
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const contentHeight = document.querySelector('.start-page-mobile')
      .offsetHeight;
    setContentHeight(contentHeight);
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
        <Bio
          isOpen={isCategoryOpen['bio']}
          toggleBio={() => toggleCategory('bio')}
          language={language}
          toggleLanguage={toggleLanguage}
        />
      </div>
      <EmptyRows contentHeight={contentHeight} />
    </>
  );
};

export default StartPageMobile;
