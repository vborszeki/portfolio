import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useRect } from '@reach/rect';
import Wrapper from '../Wrapper/Wrapper';
import Selected from '../Selected/Selected';
import { projectsPlaceholder } from './projectsPlaceholder';
import { placeProjectsInGrid } from './utils';
import './works.css';

const Works = ({ category }) => {
  const [hoveredElement, setHoveredElement] = useState('');
  const [friendlyUrlTitle, setFriendlyUrlTitle] = useState('');
  const [projects, setProjects] = useState(projectsPlaceholder);
  const ref = useRef();
  const rect = useRect(ref);

  useEffect(() => {
    fetchProjectsForCategory(category);
  }, [category]);

  const fetchProjectsForCategory = async category => {
    try {
      const response = await fetch(
        `https://www.benetamas.com/api/category/${category}`
      );
      const categoryData = await response.json();
      setProjects(placeProjectsInGrid(categoryData.projects));
    } catch (err) {
      console.error(err);
    }
  };

  const handleProjectMouseOver = e => {
    let projectId;
    let hoveredElement;
    let targetClassName = e.currentTarget.className;

    if (targetClassName.includes('works-title-link')) {
      projectId = e.currentTarget.parentNode.value;
      hoveredElement = 'works-title-link';
    } else if (
      targetClassName.includes('works-photo-link') &&
      e.currentTarget.childNodes[0] &&
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

  const hasProjectThumbnail = () => hoveredElement === 'works-photo-link';
  const categories = ['architecture', 'installation', 'object', 'experiment'];

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
                  onFocus={handleProjectMouseOver}
                  onBlur={handleProjectMouseOut}
                  tabIndex="-1"
                >
                  {project.photo.photoUrl && (
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
                  )}
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
                      onFocus={handleProjectMouseOver}
                      onBlur={handleProjectMouseOut}
                    >
                      {project.title}
                    </Link>
                  </li>
                ))}
            </ul>
            <ul className="works-category-list">
              {categories.map(categoryName => {
                const isSelected = category === categoryName;
                return (
                  <li className={categoryName} key={categoryName} ref={ref}>
                    {isSelected ? (
                      <div className="works-category-selected">
                        {categoryName}
                        <Link to="/" className="works-close">
                          {rect && <Selected height={rect.height} />}
                        </Link>
                      </div>
                    ) : (
                      <Link
                        to={`/${categoryName}`}
                        className="works-category-element"
                      >
                        {categoryName}
                      </Link>
                    )}
                  </li>
                );
              })}
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

export default Works;
