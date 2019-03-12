import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContainerDimensions from 'react-container-dimensions';
import Wrapper from '../Wrapper/Wrapper';
import Selected from '../Selected/Selected';
import { projectsPlaceholder } from './projectsPlaceholder';
import { placeProjectsInGrid } from './utils';
import './works.css';

const Works = ({ category }) => {
  const [hoveredCategory, setHoveredCategory] = useState('');
  const [hoveredElement, setHoveredElement] = useState('');
  const [friendlyUrlTitle, setFriendlyUrlTitle] = useState('');
  const [projects, setProjects] = useState(projectsPlaceholder);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchProjectsForCategory(category);
  }, []);

  const fetchProjectsForCategory = category => {
    fetch(`https://www.benetamas.com/api/category/${category}`)
      .then(res => res.json())
      .then(json => setProjects(placeProjectsInGrid(json.projects)))
      .catch(console.error);

    setSelectedCategory(category);
  };

  const handleCategoryMouseOver = e => {
    setHoveredCategory(
      e.target.innerHTML
        .toString()
        .toLowerCase()
        .split(' ')[0]
    );
  };

  const handleProjectMouseOver = e => {
    let projectId;
    let hoveredElement;
    let targetClassName = e.currentTarget.className;

    if (targetClassName === 'works-title-link') {
      projectId = e.currentTarget.parentNode.value;
      hoveredElement = 'works-title-link';
    } else if (
      targetClassName.includes('works-photo-link') &&
      e.currentTarget.childNodes[0].getAttribute('src') !== ''
    ) {
      projectId = e.currentTarget.parentNode.value;
      hoveredElement = 'works-photo-link';
    }

    if (!projectId) return;

    const friendlyUrlTitle = projects.find(project => project.id === projectId)
      .friendlyUrlTitle;

    setFriendlyUrlTitle(friendlyUrlTitle);
    setHoveredElement(hoveredElement);
  };

  const handleProjectMouseOut = () => {
    setFriendlyUrlTitle('');
    setHoveredElement('');
  };

  const handleCategoryClick = () => {
    const isSameCategory =
      hoveredCategory === selectedCategory || hoveredCategory.includes('path');

    if (isSameCategory) return;

    fetchProjectsForCategory(hoveredCategory);
  };

  const hasProjectThumbnail = () => hoveredElement === 'works-photo-link';
  const categories = ['architecture', 'installation', 'object', 'experiment'];

  const renderClickableCategory = categoryName => {
    const isSelected = category === categoryName;

    return (
      <li className={categoryName} key={categoryName}>
        <Link to={`/${categoryName}`}>
          {categoryName.toUpperCase()}
          {isSelected && (
            <ContainerDimensions>
              {({ height }) => <Selected height={height} />}
            </ContainerDimensions>
          )}
        </Link>
      </li>
    );
  };

  return (
    <Wrapper>
      <div className="works-container">
        <div className="works-content">
          <ul className="works-photos">
            {projects.map(project => (
              <li key={project.id} value={project.id}>
                <Link
                  to={`/${category}/${friendlyUrlTitle}`}
                  className={`works-photo-link${
                    hasProjectThumbnail() ? ' thumbnail' : ''
                  }`}
                  onMouseOver={handleProjectMouseOver}
                  onMouseOut={handleProjectMouseOut}
                >
                  <img
                    src={project.photo.photoUrl}
                    alt=""
                    className={
                      hoveredElement === 'works-title-link' &&
                      project.friendlyUrlTitle !== friendlyUrlTitle
                        ? 'hide-project-image'
                        : null
                    }
                  />
                </Link>
              </li>
            ))}
          </ul>
          <div className="works-list">
            <ul className="works-project-list">
              {projects
                .filter(project => project.photo.photoUrl !== '')
                .map(project => (
                  <li
                    key={project.id}
                    value={project.id}
                    onFocus={handleProjectMouseOver}
                    onBlur={handleProjectMouseOut}
                    className={
                      hoveredElement === 'works-photo-link' &&
                      project.friendlyUrlTitle !== friendlyUrlTitle
                        ? 'hide-project-title'
                        : null
                    }
                  >
                    <Link
                      to={`/${category}/${friendlyUrlTitle}`}
                      className="works-title-link"
                      onMouseOver={handleProjectMouseOver}
                      onMouseOut={handleProjectMouseOut}
                    >
                      {project.title}
                    </Link>
                  </li>
                ))}
            </ul>
            <ul
              className="works-category-list"
              onMouseOver={handleCategoryMouseOver}
              onFocus={handleCategoryMouseOver}
              onClick={handleCategoryClick}
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
            <li>
              <a href="#/">BACK</a>
            </li>
          </ul>
        </nav>
      </div>
    </Wrapper>
  );
};

export default Works;
