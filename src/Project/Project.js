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

  render() {
    const { project, indexOfPhoto } = this.state;

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
            </div>
            <div
              className={
                this.state.expandDescription
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
                    display: this.state.expandDescription ? 'none' : 'grid'
                  }}
                >
                  ENG / HU
                </p>
              </div>
              <ul
                className="project-category-list"
                style={{
                  display: this.state.expandDescription ? 'none' : 'grid'
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
