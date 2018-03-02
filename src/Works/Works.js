import React, { Component } from 'react';
import ContainerDimensions from 'react-container-dimensions';
import Wrapper from '../Wrapper/Wrapper';
import Selected from './Selected';
import { photos } from '../mockImages';
import './works.css';

class Works extends Component {
  constructor() {
    super();
    this.state = {
      selectedCategory: 'architecture'
    };
  }

  handleClick(e) {
    const selectedCategory =
      typeof e.target.className === 'string'
        ? e.target.className
        : e.target.parentNode.className;

    this.setState({ selectedCategory });
  }

  render() {
    const workPhotos = [...photos, ...photos];

    return (
      <Wrapper>
        <div className="works-container">
          <div className="works-content">
            <ul className="works-photos">
              {workPhotos.map((photo, i) => (
                <li key={i}>
                  <img src={photo} alt="" />
                </li>
              ))}
            </ul>
            <div className="works-list">
              <ul className="works-project-list">
                <li>D 365 DAYS</li>
                <li>FURNANCE</li>
                <li>MKE</li>
                <li>DESIGN WEEK</li>
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
