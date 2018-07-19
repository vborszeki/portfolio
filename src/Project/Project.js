import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ContainerDimensions from 'react-container-dimensions';
import Wrapper from '../Wrapper/Wrapper';
import ProjectPager from './ProjectPager';
import './project.css';

class Project extends Component {
  constructor() {
    super();
    this.state = {
      project: { photos: [{ photoUrl: '' }] },
      projectTitles: {},
      indexOfPhoto: 0,
      expandDescription: false
    };
  }

  componentDidMount() {
    this.fetchProject(this.props.projectTitle);
    this.fetchProjectTitles();
  }

  componentWillReceiveProps(nextProps) {
    this.fetchProject(nextProps.projectTitle, nextProps.category);
  }

  componentDidUpdate(nextProps) {
    if (this.props.projectTitle !== nextProps.projectTitle) {
      this.setState({ indexOfPhoto: 0 });
    }
  }

  fetchProject(title, category = this.props.category) {
    fetch(
      `https://www.benetamas.com/api/category/${category}/project/${title}?lang=${
        this.props.language
      }`
    )
      .then(res => res.json())
      .then(project => this.setState({ project }))
      .catch(console.error);
  }

  fetchProjectTitles() {
    fetch('https://benetamas.com/api/first')
      .then(res => res.json())
      .then(json =>
        this.setState({
          projectTitles: {
            architecture:
              this.getFirstProjectOfCategory(json.projects, 'architecture') ||
              'project',
            installation:
              this.getFirstProjectOfCategory(json.projects, 'installation') ||
              'project',
            object:
              this.getFirstProjectOfCategory(json.projects, 'object') ||
              'project',
            experiment:
              this.getFirstProjectOfCategory(json.projects, 'experiment') ||
              'project'
          }
        })
      )
      .catch(console.error);
  }

  getFirstProjectOfCategory(projects, category) {
    return projects.find(project => project.categoryName === category).project
      .friendlyUrlTitle;
  }

  handleLanguageClick = async () => {
    await this.props.toggleLanguage();
    this.fetchProject(this.props.projectTitle);
  };

  handleDescriptionClick = () => {
    this.setState(prevState => ({
      expandDescription: !prevState.expandDescription
    }));
  };

  handleNextPhotoClick = () => {
    if (this.state.indexOfPhoto === this.state.project.numberOfPhotos - 1) {
      this.setState({ indexOfPhoto: -1 });
    }
    this.setState(prevState => ({ indexOfPhoto: prevState.indexOfPhoto + 1 }));
  };

  handlePrevPhotoClick = () => {
    if (this.state.indexOfPhoto === 0) {
      this.setState({ indexOfPhoto: this.state.project.numberOfPhotos });
    }
    this.setState(prevState => ({ indexOfPhoto: prevState.indexOfPhoto - 1 }));
  };

  getImagesToPreload() {
    const { project, indexOfPhoto } = this.state;
    return project.photos.slice(indexOfPhoto + 1, indexOfPhoto + 2);
  }

  render() {
    const {
      project,
      indexOfPhoto,
      expandDescription,
      projectTitles
    } = this.state;

    const categories = ['architecture', 'installation', 'object', 'experiment'];

    const counter = project.projectIndex
      ? `${project.projectIndex}/${project.numberOfProjects}`
      : '';

    const renderClickableCategory = categoryName => (
      <li className={categoryName} key={categoryName}>
        <Link to={`/${categoryName}/${projectTitles[categoryName]}`}>
          {categoryName.toUpperCase()}
        </Link>
        {this.props.category === categoryName && (
          <ContainerDimensions>
            {({ height }) => (
              <ProjectPager
                counter={counter}
                height={height}
                project={project}
                category={this.props.category}
              />
            )}
          </ContainerDimensions>
        )}
      </li>
    );

    return (
      <Wrapper>
        <div className="project-container">
          <div className="project-content">
            <div className="project-photos">
              <img
                src={
                  project.photos && project.photos.length > 0
                    ? project.photos[indexOfPhoto].photoUrl
                    : ''
                }
                alt=""
              />
              <div className="project-photos__preloaded">
                {project.photos &&
                  project.photos.length > 1 &&
                  this.getImagesToPreload().map(image => (
                    <img key={image.photoUrl} src={image.photoUrl} alt="" />
                  ))}
              </div>
              <div className="prev-photo" onClick={this.handlePrevPhotoClick} />
              <div className="next-photo" onClick={this.handleNextPhotoClick} />
            </div>
            <div
              className={
                expandDescription
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
                  <p className="photo-counter">
                    {project.numberOfPhotos
                      ? `${indexOfPhoto + 1}/${project.numberOfPhotos}`
                      : ''}
                  </p>
                </div>
                <p
                  className="project-text"
                  onClick={this.handleDescriptionClick}
                >
                  {project.description}
                </p>
                <div className="project-language-container">
                  <span
                    className="project-language"
                    onClick={this.handleLanguageClick}
                    style={{
                      display: expandDescription ? 'none' : 'inline-block'
                    }}
                  >
                    ENG / HU
                  </span>
                </div>
              </div>
              <ul
                className="project-category-list"
                style={{
                  display: expandDescription ? 'none' : 'grid'
                }}
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
                <a href={`#/${this.props.category}`}>BACK</a>
              </li>
            </ul>
          </nav>
        </div>
      </Wrapper>
    );
  }
}

export default Project;
