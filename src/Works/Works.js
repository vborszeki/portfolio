import React, { Component } from 'react';
import ContainerDimensions from 'react-container-dimensions';
import { Link } from 'react-router-dom';
import Wrapper from '../Wrapper/Wrapper';
import Selected from './Selected';
import { projectsPlaceholder } from './projectsPlaceholder';
import './works.css';

class Works extends Component {
  constructor() {
    super();
    this.state = {
      hoveredCategory: '',
      hoveredImageId: null,
      hoveredTitleId: null,
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
        this.setState({ projects: this.shuffleProjects(json.projects) })
      )
      .catch(console.error);
  }

  shuffleProjects(projects) {
    const paddedProjects = [...projects, ...projectsPlaceholder].slice(0, 16);
    return paddedProjects.sort(() => 0.5 - Math.random());
  }

  handleCategoryMouseOver(e) {
    this.setState({
      hoveredCategory: e.target.innerHTML
        .toString()
        .toLowerCase()
        .split(' ')[0]
    });
  }

  handleImageMouseOver(e) {
    this.setState({ hoveredImageId: e.target.parentNode.value });
  }

  handleImageMouseOut() {
    this.setState({ hoveredImageId: null });
  }

  handleTitleMouseOver(e) {
    this.setState({ hoveredTitleId: e.target.value });
  }

  handleTitleMouseOut() {
    this.setState({ hoveredTitleId: null });
  }

  handleCategoryClick() {
    this.fetchProjectsForCategory(this.state.hoveredCategory);
  }

  render() {
    const { projects } = this.state;

    return (
      <Wrapper>
        <div className="works-container">
          <div className="works-content">
            <ul className="works-photos">
              {projects.map(e => (
                <li key={e.id} value={e.id}>
                  <img
                    src={e.photo.photoUrl}
                    alt=""
                    onMouseOver={e => this.handleImageMouseOver(e)}
                    onMouseOut={() => this.handleImageMouseOut()}
                    className={
                      this.state.hoveredTitleId !== null &&
                      e.id !== this.state.hoveredTitleId
                        ? 'hide-project-image'
                        : null
                    }
                  />
                </li>
              ))}
            </ul>
            <div className="works-list">
              <ul className="works-project-list">
                {projects.filter(e => e.photo.photoUrl !== '').map(e => (
                  <Link
                    to={`/${this.props.category}/${this.state.hoveredTitleId}`}
                    key={e.id}
                  >
                    <li
                      value={e.id}
                      onMouseOver={e => this.handleTitleMouseOver(e)}
                      onMouseOut={() => this.handleTitleMouseOut()}
                      className={
                        this.state.hoveredImageId !== null &&
                        e.id !== this.state.hoveredImageId
                          ? 'hide-project-title'
                          : null
                      }
                    >
                      {e.title}
                    </li>
                  </Link>
                ))}
              </ul>
              <ul
                className="works-category-list"
                onMouseOver={e => this.handleCategoryMouseOver(e)}
                onClick={() => this.handleCategoryClick()}
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
