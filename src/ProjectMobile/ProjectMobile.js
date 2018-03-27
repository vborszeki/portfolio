import React, { Component } from 'react';
import ContainerDimensions from 'react-container-dimensions';
import ProjectMobilePager from './ProjectMobilePager';
import './projectMobile.css';

class ProjectMobile extends Component {
  constructor() {
    super();
    this.state = {
      project: { photos: [{ photoUrl: '' }] },
      indexOfPhoto: 0,
      expandDescription: false
    };
  }

  componentDidMount() {
    this.fetchProject();
  }

  fetchProject() {
    const { category, projectTitle, language } = this.props;

    fetch(
      `https://www.benetamas.com/api/category/${category}/project/${projectTitle}?lang=${language}`
    )
      .then(res => res.json())
      .then(project => this.setState({ project }))
      .catch(console.error);
  }

  handlePhotoClick() {
    if (this.state.indexOfPhoto === this.state.project.numberOfPhotos - 1) {
      this.setState({ indexOfPhoto: -1 });
    }
    this.setState(prevState => ({ indexOfPhoto: prevState.indexOfPhoto + 1 }));
  }

  async handleLanguageClick() {
    await this.props.toggleLanguage();
    this.fetchProject();
  }

  handleDescriptionClick() {
    this.setState(prevState => ({
      expandDescription: !prevState.expandDescription
    }));
  }

  render() {
    const { project, indexOfPhoto, expandDescription } = this.state;
    const { category } = this.props;
    const counter = project.projectIndex
      ? `${project.projectIndex}/${project.numberOfProjects}`
      : '';

    return (
      <div
        className={
          expandDescription ? 'project-mobile--expanded' : 'project-mobile'
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
            expandDescription
              ? 'project-mobile__description--expanded'
              : 'project-mobile__description'
          }
        >
          <p>
            {project.title}{' '}
            <span
              className="project-mobile__language"
              onClick={() => this.handleLanguageClick()}
            >
              {project.description && 'ENG / HU'}
            </span>
          </p>
          <p onClick={() => this.handleDescriptionClick()}>
            {project.description}
          </p>
        </section>
        <div
          className="project-mobile__photo"
          onClick={() => this.handlePhotoClick()}
          style={{
            display: expandDescription ? 'none' : 'flex'
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
        </div>
        <footer className="project-mobile__footer">
          BENETAMAS{' '}
          <span className="photo-mobile__photo-counter">
            {project.numberOfPhotos
              ? `${indexOfPhoto + 1}/${project.numberOfPhotos}`
              : ''}
          </span>
        </footer>
      </div>
    );
  }
}

export default ProjectMobile;
