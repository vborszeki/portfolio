import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContainerDimensions from 'react-container-dimensions';
import Wrapper from '../Wrapper/Wrapper';
import ProjectPager from './ProjectPager';
import './project.css';

const Project = ({ category, projectTitle, language, toggleLanguage }) => {
  const [project, setProject] = useState({ photos: [{ photoUrl: '' }] });
  const [projectTitles, setProjectTitles] = useState({});
  const [indexOfPhoto, setIndexOfPhoto] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    fetchProject(projectTitle);
    fetchProjectTitles();
  }, [category, projectTitle, language]);

  useEffect(() => {
    setIndexOfPhoto(0);
  }, [projectTitle]);

  const fetchProject = (title, categoryName = category) => {
    fetch(
      `https://www.benetamas.com/api/category/${categoryName}/project/${title}?lang=${language}`
    )
      .then(res => res.json())
      .then(project => setProject(project))
      .catch(console.error);
  };

  const fetchProjectTitles = () => {
    fetch('https://benetamas.com/api/first')
      .then(res => res.json())
      .then(json =>
        setProjectTitles({
          architecture:
            getFirstProjectOfCategory(json.projects, 'architecture') ||
            'project',
          installation:
            getFirstProjectOfCategory(json.projects, 'installation') ||
            'project',
          object:
            getFirstProjectOfCategory(json.projects, 'object') || 'project',
          experiment:
            getFirstProjectOfCategory(json.projects, 'experiment') || 'project'
        })
      )
      .catch(console.error);
  };

  const getFirstProjectOfCategory = (projects, category) => {
    return (
      projects.find(project => project.categoryName === category) &&
      projects.find(project => project.categoryName === category).project
        .friendlyUrlTitle
    );
  };

  const handleDescriptionClick = () => {
    if (window.getSelection().toString()) return;
    setIsDescriptionExpanded(!isDescriptionExpanded);
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

  const getImagesToPreload = () =>
    project.photos.slice(indexOfPhoto + 1, indexOfPhoto + 2);

  const categories = ['architecture', 'installation', 'object', 'experiment'];
  const counter = project.projectIndex
    ? `${project.projectIndex}/${project.numberOfProjects}`
    : '';

  const renderClickableCategory = categoryName => {
    const isSelected = category === categoryName;

    return (
      <li className={categoryName} key={categoryName}>
        <ContainerDimensions>
          {({ width, height }) => (
            <>
              {isSelected ? (
                <>
                  <span
                    className="project-category-selected"
                    style={{ width: width / 4 }}
                  >
                    {categoryName.toUpperCase()}
                  </span>
                  <ProjectPager
                    counter={counter}
                    height={height}
                    project={project}
                    category={category}
                  />
                </>
              ) : (
                <Link
                  to={`/${categoryName}/${projectTitles[categoryName]}`}
                  className="project-category-element"
                >
                  {categoryName.toUpperCase()}
                </Link>
              )}
            </>
          )}
        </ContainerDimensions>
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
                project.photos &&
                project.photos.length > 0 &&
                project.photos[indexOfPhoto] &&
                project.photos[indexOfPhoto].photoUrl
                  ? project.photos[indexOfPhoto].photoUrl
                  : ''
              }
              alt=""
            />
            <div className="project-photos__preloaded">
              {project.photos &&
                project.photos.length > 1 &&
                getImagesToPreload().map(image => (
                  <img key={image.photoUrl} src={image.photoUrl} alt="" />
                ))}
            </div>
            <div
              className="aria-prev-photo"
              aria-label="previous"
              role="button"
              tabIndex="0"
              onKeyPress={handlePrevPhotoClick}
            />
            <div
              className="aria-next-photo"
              aria-label="next"
              role="button"
              tabIndex="0"
              onKeyPress={handleNextPhotoClick}
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
                  <div className="project-language" onClick={toggleLanguage}>
                    {language === 'hu' ? 'en' : 'hu'}
                  </div>
                )}
                <p className="photo-counter">
                  {project.numberOfPhotos
                    ? `${indexOfPhoto + 1}/${project.numberOfPhotos}`
                    : ''}
                </p>
              </div>
              <p className="project-text" onClick={handleDescriptionClick}>
                {project.description}
              </p>
            </div>
            {!isDescriptionExpanded && (
              <ul className="project-category-list">
                {categories.map(category => renderClickableCategory(category))}
              </ul>
            )}
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
