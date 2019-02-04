import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import Carousel from 'nuka-carousel';
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

  async fetchProject() {
    const { category, projectTitle } = this.props.match.params;
    const { language } = this.props;

    try {
      const response = await fetch(
        `https://www.benetamas.com/api/category/${category}/project/${projectTitle}?lang=${language}`
      );
      const project = await response.json();

      this.setState({
        project,
        indexOfPhoto: 0
      });
    } catch (err) {
      console.error(err);
    }
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

  render() {
    const { project, indexOfPhoto, isDescriptionExpanded } = this.state;
    const { category } = this.props;
    const counter = project.projectIndex
      ? `${project.projectIndex}/${project.numberOfProjects}`
      : '';

    const renderSwipeableProject = project => (
      <div>
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
        <div
          className="project-mobile__photo"
          onClick={this.handlePhotoClick}
          style={{
            display: isDescriptionExpanded ? 'none' : 'flex'
          }}
        >
          <img
            src={
              project.photos &&
              project.photos.length > 0 &&
              project.photos[indexOfPhoto]
                ? project.photos[indexOfPhoto].photoUrl
                : ''
            }
            alt=""
          />
        </div>
      </div>
    );

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
        {/* <Carousel
          swiping
          withoutControls
          wrapAround=
          slideIndex={1}
          afterSlide={() => {}}
        > */}
        {renderSwipeableProject(this.state.project)}
        {/* </Carousel> */}
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
