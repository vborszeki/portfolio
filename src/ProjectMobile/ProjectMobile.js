import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useRect } from '@reach/rect';
import LazyLoad from 'react-lazyload';
import smoothscroll from 'smoothscroll-polyfill';
import MobileClose from './MobileClose';
import './projectMobile.css';

const ProjectMobile = ({ language, toggleLanguage }) => {
  const [project, setProject] = useState({ photos: [{ photoUrl: '' }] });
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const { category, projectTitle } = useParams();
  const ref = useRef();
  const rect = useRect(ref);
  const width = window.innerWidth;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `https://www.benetamas.com/api/category/${category}/project/${projectTitle}?lang=${language}`
        );
        const project = await response.json();

        setProject(project);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProject();
  }, [category, projectTitle, language]);

  useEffect(() => {
    if (!isDescriptionExpanded && window.scrollY !== 0) {
      window.scrollTo(0, 0);
    }
  }, [isDescriptionExpanded]);

  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  const handleDescriptionClick = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <main>
      <header className="project-mobile__header" ref={ref}>
        {project.title}
        <MobileClose height={rect && rect.height} />
      </header>
      <section
        className={
          isDescriptionExpanded
            ? 'project-mobile__description--expanded'
            : 'project-mobile__description'
        }
      >
        <div className="project-mobile__language" onClick={toggleLanguage}>
          {language === 'hu' ? 'en' : 'hu'}
        </div>
        <p onClick={handleDescriptionClick}>{project.description}</p>
      </section>
      {!isDescriptionExpanded && (
        <>
          {project.photos.map((photo, id) => (
            <div key={id}>
              <LazyLoad height={width} offset={width} once>
                <div
                  className="project-mobile__photo"
                  style={{ height: width }}
                >
                  <img src={photo.photoUrl} alt="" />
                </div>
              </LazyLoad>
              <div className="project-mobile__gutter" />
            </div>
          ))}
          <footer
            className="project-mobile__footer"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }}
          >
            Top
          </footer>
        </>
      )}
    </main>
  );
};

export default ProjectMobile;
