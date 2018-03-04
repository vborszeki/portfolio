import React, { Component } from 'react';
import Wrapper from '../Wrapper/Wrapper';
import './startPage.css';

class StartPage extends Component {
  constructor() {
    super();
    this.state = {
      photos: [{}, {}, {}, {}, {}, {}, {}, {}]
    };
  }

  componentDidMount() {
    this.fetchPhotos();
  }

  handleClick() {
    this.fetchPhotos();
  }

  fetchPhotos = () => {
    fetch('https://www.benetamas.com/api/welcome')
      .then(res => res.json())
      .then(photos => this.setState({ photos }))
      .catch(console.error);
  };

  render() {
    return (
      <Wrapper>
        <div className="start-page-container">
          <ul className="start-page-photos" onClick={() => this.handleClick()}>
            {this.state.photos.map(photo => (
              <li key={photo.id}>
                <img src={photo.photoUrl} alt="" />
              </li>
            ))}
          </ul>
          <nav>
            <ul className="navigation">
              <li>
                <a href="#/bio">BENETAMAS</a>
              </li>
              <li>
                <a href="#/category/architecture">WORKS</a>
              </li>
            </ul>
          </nav>
        </div>
      </Wrapper>
    );
  }
}

export default StartPage;
