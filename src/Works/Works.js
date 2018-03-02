import React, { Component } from 'react';
import ContainerDimensions from 'react-container-dimensions';
import Wrapper from '../Wrapper/Wrapper';
import Selected from './Selected';
import { photos } from './mockApiResponse';
import './works.css';

class Works extends Component {
  constructor() {
    super();
    this.state = {
      selectedCategory: 'architecture',
      hoveredImageId: null,
      hoveredTitleId: null
    };
  }

  handleClick(e) {
    const selectedCategory =
      typeof e.target.className === 'string'
        ? e.target.className
        : e.target.parentNode.className;

    this.setState({ selectedCategory });
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

  render() {
    const projectNames = photos.map(e => ({
      id: e.id,
      projectName: e.projectName
    }));

    const workPhotos = [
      { id: null, photoUrl: '' },
      { id: null, photoUrl: '' },
      photos[0],
      { id: null, photoUrl: '' },
      { id: null, photoUrl: '' },
      photos[1],
      { id: null, photoUrl: '' },
      { id: null, photoUrl: '' },
      photos[2],
      { id: null, photoUrl: '' },
      { id: null, photoUrl: '' },
      { id: null, photoUrl: '' },
      { id: null, photoUrl: '' },
      { id: null, photoUrl: '' },
      photos[3],
      { id: null, photoUrl: '' }
    ];

    return (
      <Wrapper>
        <div className="works-container">
          <div className="works-content">
            <ul className="works-photos">
              {workPhotos.map(e => (
                <li key={e.id} value={e.id}>
                  <img
                    src={e.photoUrl}
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
                {projectNames.map(e => (
                  <li
                    key={e.id}
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
                    {e.projectName}
                  </li>
                ))}
              </ul>
              <ul
                className="works-category-list"
                onClick={e => this.handleClick(e)}
              >
                <li className="architecture">
                  ARCHITECTURE{' '}
                  {this.state.selectedCategory === 'architecture' && (
                    <ContainerDimensions>
                      {({ height }) => <Selected height={height} />}
                    </ContainerDimensions>
                  )}
                </li>
                <li className="installation">
                  INSTALLATION{' '}
                  {this.state.selectedCategory === 'installation' && (
                    <ContainerDimensions>
                      {({ height }) => <Selected height={height} />}
                    </ContainerDimensions>
                  )}
                </li>
                <li className="object">
                  OBJECT{' '}
                  {this.state.selectedCategory === 'object' && (
                    <ContainerDimensions>
                      {({ height }) => <Selected height={height} />}
                    </ContainerDimensions>
                  )}
                </li>
                <li className="experiment">
                  EXPERIMENT{' '}
                  {this.state.selectedCategory === 'experiment' && (
                    <ContainerDimensions>
                      {({ height }) => <Selected height={height} />}
                    </ContainerDimensions>
                  )}
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
