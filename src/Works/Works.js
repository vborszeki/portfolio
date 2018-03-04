import React, { Component } from 'react';
import ContainerDimensions from 'react-container-dimensions';
import { Link } from 'react-router-dom';
import Wrapper from '../Wrapper/Wrapper';
import Selected from './Selected';
import { photos } from './mockApiResponse';
import './works.css';

class Works extends Component {
  constructor() {
    super();
    this.state = {
      hoveredCategory: '',
      hoveredImageId: null,
      hoveredTitleId: null
    };
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
                  <Link
                    to={`/category/${this.props.category ||
                      this.state.selectedCategory}/${
                      this.state.hoveredTitleId
                    }`}
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
                      {e.projectName}
                    </li>
                  </Link>
                ))}
              </ul>
              <ul
                className="works-category-list"
                onMouseOver={e => this.handleCategoryMouseOver(e)}
              >
                <li className="architecture">
                  <Link to={`/category/${this.state.hoveredCategory}`}>
                    ARCHITECTURE{' '}
                    {this.props.category === 'architecture' && (
                      <ContainerDimensions>
                        {({ height }) => <Selected height={height} />}
                      </ContainerDimensions>
                    )}
                  </Link>
                </li>
                <li className="installation">
                  <Link to={`/category/${this.state.hoveredCategory}`}>
                    INSTALLATION{' '}
                    {this.props.category === 'installation' && (
                      <ContainerDimensions>
                        {({ height }) => <Selected height={height} />}
                      </ContainerDimensions>
                    )}
                  </Link>
                </li>
                <li className="object">
                  <Link to={`/category/${this.state.hoveredCategory}`}>
                    OBJECT{' '}
                    {this.props.category === 'object' && (
                      <ContainerDimensions>
                        {({ height }) => <Selected height={height} />}
                      </ContainerDimensions>
                    )}
                  </Link>
                </li>
                <li className="experiment">
                  <Link to={`/category/${this.state.hoveredCategory}`}>
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
