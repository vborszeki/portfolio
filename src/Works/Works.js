import React, { Component } from 'react';
import ContainerDimensions from 'react-container-dimensions';
import { Link } from 'react-router-dom';
import Wrapper from '../Wrapper/Wrapper';
import Selected from '../Selected/Selected';
import { projectsPlaceholder } from './projectsPlaceholder';
import { placeProjectsInGrid } from './utils';
import './works.css';

class Works extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredCategory: '',
      hoveredElement: '',
      friendlyUrlTitle: '',
      projects: projectsPlaceholder,
      selectedCategory: ''
    };
  }

  componentDidMount() {
    this.fetchProjectsForCategory(this.props.category);
  }

  fetchProjectsForCategory(category) {
    fetch(`https://www.benetamas.com/api/category/${category}`)
      .then(res => res.json())
      .then(json =>
        this.setState({ projects: placeProjectsInGrid(json.projects) })
      )
      .catch(console.error);

    this.setState({ selectedCategory: category });
  }

  handleCategoryMouseOver = e => {
    this.setState({
      hoveredCategory: e.target.innerHTML
        .toString()
        .toLowerCase()
        .split(' ')[0]
    });
  };

  handleProjectMouseOver = e => {
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

    const friendlyUrlTitle = this.state.projects.find(
      project => project.id === projectId
    ).friendlyUrlTitle;

    this.setState({ friendlyUrlTitle, hoveredElement });
  };

  handleProjectMouseOut = () => {
    this.setState({ friendlyUrlTitle: '', hoveredElement: '' });
  };

  handleCategoryClick = () => {
    const isSameCategory =
      this.state.hoveredCategory === this.state.selectedCategory ||
      this.state.hoveredCategory.includes('path');

    if (isSameCategory) return;

    this.fetchProjectsForCategory(this.state.hoveredCategory);
  };

  hasProjectThumbnail = () => this.state.hoveredElement === 'works-photo-link';

  render() {
    const { projects, friendlyUrlTitle, hoveredElement } = this.state;
    const categories = ['architecture', 'installation', 'object', 'experiment'];

    const renderClickableCategory = categoryName => {
      const isSelected = this.props.category === categoryName;

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
                    to={`/${this.props.category}/${friendlyUrlTitle}`}
                    className={`works-photo-link${
                      this.hasProjectThumbnail() ? ' thumbnail' : ''
                    }`}
                    onMouseOver={this.handleProjectMouseOver}
                    onMouseOut={this.handleProjectMouseOut}
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
                      onFocus={this.handleProjectMouseOver}
                      onBlur={this.handleProjectMouseOut}
                      className={
                        hoveredElement === 'works-photo-link' &&
                        project.friendlyUrlTitle !== friendlyUrlTitle
                          ? 'hide-project-title'
                          : null
                      }
                    >
                      <Link
                        to={`/${this.props.category}/${friendlyUrlTitle}`}
                        className="works-title-link"
                        onMouseOver={this.handleProjectMouseOver}
                        onMouseOut={this.handleProjectMouseOut}
                      >
                        {project.title}
                      </Link>
                    </li>
                  ))}
              </ul>
              <ul
                className="works-category-list"
                onMouseOver={this.handleCategoryMouseOver}
                onFocus={this.handleCategoryMouseOver}
                onClick={this.handleCategoryClick}
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
  }
}

export default Works;
