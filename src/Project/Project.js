import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useRect } from '@reach/rect';
import Wrapper from '../Wrapper/Wrapper';
import ProjectPager from './ProjectPager';
import './project.css';

const Project = ({ category, projectTitle, language, toggleLanguage }) => {
  const [project, setProject] = useState({ photos: [{ photoUrl: '' }] });
  const [indexOfPhoto, setIndexOfPhoto] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const ref = useRef();
  const rect = useRect(ref);

  useEffect(() => {
    const fetchProject = async (title, categoryName = category) => {
      try {
        const response = await fetch(
          `https://www.benetamas.com/api/category/${categoryName}/project/${title}?lang=${language}`
        );
        const project = await response.json();
        setProject(project);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProject(projectTitle);
  }, [category, projectTitle, language]);

  useEffect(() => {
    setIndexOfPhoto(0);
  }, [projectTitle]);

  const handleDescriptionClick = () => {
    if (window.getSelection().toString()) return;
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const handleDescriptionKeyPress = e => {
    if (e.key === 'Enter') {
      setIsDescriptionExpanded(!isDescriptionExpanded);
    }
  };

  const handleNextPhotoClick = () => {
    if (indexOfPhoto === project.numberOfPhotos - 1) {
      setIndexOfPhoto(0);
    } else {
      setIndexOfPhoto(indexOfPhoto + 1);
    }
  };

  const handlePrevPhotoClick = () => {
    if (indexOfPhoto === 0) {
      setIndexOfPhoto(project.numberOfPhotos - 1);
    } else {
      setIndexOfPhoto(indexOfPhoto - 1);
    }
  };

  const handleNextPhotoKeyPress = e => {
    if (e.key === 'Enter') {
      handleNextPhotoClick();
    }
  };

  const handlePrevPhotoKeyPress = e => {
    if (e.key === 'Enter') {
      handlePrevPhotoClick();
    }
  };

  const getImagesToPreload = () =>
    project.photos.slice(indexOfPhoto + 1, indexOfPhoto + 2);

  const categories = ['architecture', 'installation', 'object', 'experiment'];
  const counter = project.projectIndex
    ? `${project.projectIndex}/${project.numberOfProjects}`
    : '';

  const renderClickableCategory = categoryName => {
    const isSelected = category === categoryName;

    return (
      <li className={categoryName} key={categoryName} ref={ref}>
        <>
          {isSelected ? (
            <>
              <span
                className="project-category-selected"
                style={{ width: rect && rect.width / 4 }}
              >
                {categoryName}
              </span>
              {rect && (
                <ProjectPager
                  counter={counter}
                  height={rect.height}
                  project={project}
                  category={category}
                />
              )}
            </>
          ) : (
            <Link to={`/${categoryName}`} className="project-category-element">
              {categoryName}
            </Link>
          )}
        </>
      </li>
    );
  };

  return (
    <Wrapper>
      <div className="project-container">
        <div className="project-content">
          <div className="project-photos">
            <img
              src={
                project.photos?.length > 0 &&
                project.photos[indexOfPhoto]?.photoUrl
                  ? project.photos[indexOfPhoto].photoUrl
                  : ''
              }
              alt=""
            />
            <div className="project-photos__preloaded">
              {project.photos?.length > 1 &&
                getImagesToPreload().map(image => (
                  <img key={image.photoUrl} src={image.photoUrl} alt="" />
                ))}
            </div>
            <div
              className="aria-prev-photo"
              aria-label="previous"
              role="button"
              tabIndex="0"
              onKeyPress={handlePrevPhotoKeyPress}
            />
            <div
              className="aria-next-photo"
              aria-label="next"
              role="button"
              tabIndex="0"
              onKeyPress={handleNextPhotoKeyPress}
            />
            <div className="prev-photo" onClick={handlePrevPhotoClick} />
            <div className="next-photo" onClick={handleNextPhotoClick} />
          </div>
          <div
            className={
              isDescriptionExpanded
                ? 'project-details--expanded'
                : 'project-details'
            }
          >
            <div className="project-description">
              <div className="project-header">
                <div className="project-title">
                  <p>{project.title}</p>
                  <span className="project-subtitle">{project.subtitle}</span>
                </div>
                {project.title && (
                  <div
                    className="project-language"
                    role="button"
                    tabIndex="0"
                    onClick={toggleLanguage}
                    onKeyPress={toggleLanguage}
                  >
                    {language === 'hu' ? 'en' : 'hu'}
                  </div>
                )}
                <p className="photo-counter">
                  {project.numberOfPhotos
                    ? `${indexOfPhoto + 1}/${project.numberOfPhotos}`
                    : ''}
                </p>
              </div>
              <p
                className="project-text"
                tabIndex="0"
                onClick={handleDescriptionClick}
                onKeyPress={handleDescriptionKeyPress}
              >
                {project.description}
              </p>
            </div>
            <ul
              className={
                !isDescriptionExpanded
                  ? 'project-category-list'
                  : 'project-category-list--expanded'
              }
            >
              {categories.map(category => renderClickableCategory(category))}
            </ul>
          </div>
        </div>
        <nav>
          <ul className="navigation">
            <li>
              <a href="#/bio">BENETAMAS</a>
            </li>
          </ul>
        </nav>
      </div>
    </Wrapper>
  );
};

export default Project;
