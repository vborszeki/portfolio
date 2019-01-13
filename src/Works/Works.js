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
      projects: projectsPlaceholder
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
      targetClassName === 'works-photo-link' &&
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
    this.fetchProjectsForCategory(this.state.hoveredCategory);
  };

  render() {
    const { projects, friendlyUrlTitle, hoveredElement } = this.state;

    return (
      <Wrapper>
        <div className="works-container">
          <div className="works-content">
            <ul className="works-photos">
              {projects.map(project => (
                <li key={project.id} value={project.id}>
                  <Link
                    to={`/${this.props.category}/${friendlyUrlTitle}`}
                    className="works-photo-link"
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
                <li className="architecture">
                  <Link to={`/${this.state.hoveredCategory}`}>
                    ARCHITECTURE{' '}
                    {this.props.category === 'architecture' && (
                      <ContainerDimensions>
                        {({ height }) => <Selected height={height} />}
                      </ContainerDimensions>
                    )}
                  </Link>
                </li>
                <li className="installation">
                  <Link to={`/${this.state.hoveredCategory}`}>
                    INSTALLATION{' '}
                    {this.props.category === 'installation' && (
                      <ContainerDimensions>
                        {({ height }) => <Selected height={height} />}
                      </ContainerDimensions>
                    )}
                  </Link>
                </li>
                <li className="object">
                  <Link to={`/${this.state.hoveredCategory}`}>
                    OBJECT{' '}
                    {this.props.category === 'object' && (
                      <ContainerDimensions>
                        {({ height }) => <Selected height={height} />}
                      </ContainerDimensions>
                    )}
                  </Link>
                </li>
                <li className="experiment">
                  <Link to={`/${this.state.hoveredCategory}`}>
                    EXPERIMENT{' '}
                    {this.props.category === 'experiment' && (
                      <ContainerDimensions>
                        {({ height }) => <Selected height={height} />}
                      </ContainerDimensions>
                    )}
                  </Link>
                </li>
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
