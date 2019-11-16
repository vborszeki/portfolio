import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import ContainerDimensions from 'react-container-dimensions';
import LazyLoad from 'react-lazyload';
import smoothscroll from 'smoothscroll-polyfill';
import MobileClose from './MobileClose';
import './projectMobile.css';

const ProjectMobile = props => {
  const [project, setProject] = useState({ photos: [{ photoUrl: '' }] });
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [props.match.params.projectTitle, props.language]);

  useEffect(() => {
    if (!isDescriptionExpanded && window.scrollY !== 0) {
      window.scrollTo(0, 0);
    }
  }, [isDescriptionExpanded]);

  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  const fetchProject = async () => {
    const { category, projectTitle } = props.match.params;

    try {
      const response = await fetch(
        `https://www.benetamas.com/api/category/${category}/project/${projectTitle}?lang=${props.language}`
      );
      const project = await response.json();

      setProject(project);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDescriptionClick = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <main>
      <header className="project-mobile__header">
        {project.title && project.title.toUpperCase()}
        <ContainerDimensions>
          {({ height }) => <MobileClose height={height} />}
        </ContainerDimensions>
      </header>
      <section
        className={
          isDescriptionExpanded
            ? 'project-mobile__description--expanded'
            : 'project-mobile__description'
        }
      >
        <div
          className="project-mobile__language"
          onClick={props.toggleLanguage}
        >
          {props.language === 'hu' ? 'en' : 'hu'}
        </div>
        <p onClick={handleDescriptionClick}>{project.description}</p>
      </section>
      {!isDescriptionExpanded && (
        <>
          {project.photos.map((photo, id) => (
            <ContainerDimensions key={id}>
              {({ width }) => (
                <>
                  <LazyLoad height={width} offset={width} once>
                    <div
                      className="project-mobile__photo"
                      style={{ height: width }}
                    >
                      <img src={photo.photoUrl} alt="" />
                    </div>
                  </LazyLoad>
                  <div className="project-mobile__gutter" />
                </>
              )}
            </ContainerDimensions>
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

export default withRouter(ProjectMobile);
