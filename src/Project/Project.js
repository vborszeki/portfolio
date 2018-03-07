import React, { Component } from 'react';
import Wrapper from '../Wrapper/Wrapper';
import './project.css';

class Project extends Component {
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
    fetch(
      `https://www.benetamas.com/api/category/${this.props.category}/project/${
        this.props.projectId
      }?lang=${this.props.language}`
    )
      .then(res => res.json())
      .then(project => this.setState({ project }))
      .catch(console.error);
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

  handleNextPhotoClick() {
    if (this.state.indexOfPhoto === this.state.project.numberOfPhotos - 1) {
      this.setState({ indexOfPhoto: -1 });
    }
    this.setState(prevState => ({ indexOfPhoto: prevState.indexOfPhoto + 1 }));
  }

  handlePrevPhotoClick() {
    if (this.state.indexOfPhoto === 0) {
      this.setState({ indexOfPhoto: this.state.project.numberOfPhotos });
    }
    this.setState(prevState => ({ indexOfPhoto: prevState.indexOfPhoto - 1 }));
  }

  getImagesToPreload() {
    const { project, indexOfPhoto } = this.state;
    return project.photos.slice(indexOfPhoto + 1, indexOfPhoto + 2);
  }

  render() {
    const { project, indexOfPhoto, expandDescription } = this.state;

    return (
      <Wrapper>
        <div className="project-container">
          <div className="project-content">
            <div className="project-photos">
              <img
                src={
                  project.photos.length > 0
                    ? project.photos[indexOfPhoto].photoUrl
                    : ''
                }
                alt=""
              />
              <div className="project-photos__preloaded">
                {project.photos.length > 1 &&
                  this.getImagesToPreload().map(image => (
                    <img key={image.photoUrl} src={image.photoUrl} alt="" />
                  ))}
              </div>
              <div
                className="prev-photo"
                onClick={() => this.handlePrevPhotoClick()}
              />
              <div
                className="next-photo"
                onClick={() => this.handleNextPhotoClick()}
              />
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
                  onClick={() => this.handleDescriptionClick()}
                >
                  {project.description}
                </p>
                <p
                  className="project-language"
                  onClick={() => this.handleLanguageClick()}
                  style={{
                    display: expandDescription ? 'none' : 'grid'
                  }}
                >
                  ENG / HU
                </p>
              </div>
              <ul
                className="project-category-list"
                style={{
                  display: expandDescription ? 'none' : 'grid'
                }}
              >
                <li className="architecture">ARCHITECTURE</li>
                <li className="installation">INSTALLATION</li>
                <li className="object">OBJECT</li>
                <li className="experiment">EXPERIMENT</li>
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
