import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Swipeable from 'react-swipeable';
import ContainerDimensions from 'react-container-dimensions';
import ProjectMobilePager from './ProjectMobilePager';
import './projectMobile.css';

class ProjectMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: { photos: [{ photoUrl: '' }] },
      indexOfPhoto: 0,
      isDescriptionExpanded: false
    };
  }

  componentDidMount() {
    this.fetchProject();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.projectTitle !==
      this.props.match.params.projectTitle
    ) {
      this.fetchProject();
    }
  }

  fetchProject() {
    const { category, projectTitle } = this.props.match.params;
    const { language } = this.props;

    fetch(
      `https://www.benetamas.com/api/category/${category}/project/${projectTitle}?lang=${language}`
    )
      .then(res => res.json())
      .then(project => this.setState({ project, indexOfPhoto: 0 }))
      .catch(console.error);
  }

  handlePhotoClick = () => {
    if (this.state.indexOfPhoto === this.state.project.numberOfPhotos - 1) {
      this.setState({ indexOfPhoto: -1 });
    }
    this.setState(prevState => ({ indexOfPhoto: prevState.indexOfPhoto + 1 }));
  };

  handleLanguageClick = async () => {
    await this.props.toggleLanguage();
    this.fetchProject();
  };

  handleDescriptionClick = () => {
    this.setState(prevState => ({
      isDescriptionExpanded: !prevState.isDescriptionExpanded
    }));
  };

  isZoomed = () => window.screen.width !== window.innerWidth;

  swipeLeft = () => {
    if (this.isZoomed()) return;

    const category = this.props.match.params.category;
    const projectName = this.state.project.nextProject;

    this.props.history.push(`/${category}/${projectName}`);
  };

  swipeRight = () => {
    if (this.isZoomed()) return;

    const category = this.props.match.params.category;
    const projectName = this.state.project.previousProject;

    this.props.history.push(`/${category}/${projectName}`);
  };

  render() {
    const { project, indexOfPhoto, isDescriptionExpanded } = this.state;
    const { category } = this.props;
    const counter = project.projectIndex
      ? `${project.projectIndex}/${project.numberOfProjects}`
      : '';

    return (
      <div
        className={
          isDescriptionExpanded ? 'project-mobile--expanded' : 'project-mobile'
        }
      >
        <header className="project-mobile__header">
          {category.toUpperCase()}
          <ContainerDimensions>
            {({ height }) => (
              <ProjectMobilePager
                counter={counter}
                height={height}
                project={project}
                category={this.props.category}
              />
            )}
          </ContainerDimensions>
        </header>
        <section
          className={
            isDescriptionExpanded
              ? 'project-mobile__description--expanded'
              : 'project-mobile__description'
          }
        >
          <p>
            {project.title}{' '}
            <span
              className="project-mobile__language"
              onClick={this.handleLanguageClick}
            >
              {project.description && 'ENG / HU'}
            </span>
          </p>
          <p onClick={this.handleDescriptionClick}>{project.description}</p>
        </section>
        <Swipeable
          className="project-mobile__photo"
          onClick={this.handlePhotoClick}
          onSwipingLeft={this.swipeLeft}
          onSwipingRight={this.swipeRight}
          style={{
            display: isDescriptionExpanded ? 'none' : 'flex'
          }}
        >
          <img
            src={
              project.photos && project.photos.length > 0
                ? project.photos[indexOfPhoto].photoUrl
                : ''
            }
            alt=""
          />
        </Swipeable>
        <footer className="project-mobile__footer">
          BENETAMAS{' '}
          {!isDescriptionExpanded && (
            <span className="photo-mobile__photo-counter">
              {project.numberOfPhotos
                ? `${indexOfPhoto + 1}/${project.numberOfPhotos}`
                : ''}
            </span>
          )}
        </footer>
      </div>
    );
  }
}

export default withRouter(ProjectMobile);
