import React, { Component } from 'react';
import Wrapper from '../Wrapper/Wrapper';
import './startPage.css';

class StartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [
        { id: 100000001, photoUrl: '' },
        { id: 100000002, photoUrl: '' },
        { id: 100000003, photoUrl: '' },
        { id: 100000004, photoUrl: '' },
        { id: 100000005, photoUrl: '' },
        { id: 100000006, photoUrl: '' },
        { id: 100000007, photoUrl: '' },
        { id: 100000008, photoUrl: '' }
      ]
    };
  }

  componentDidMount() {
    this.fetchPhotos();
  }

  handleClick = () => {
    this.fetchPhotos();
  };

  async fetchPhotos() {
    try {
      const response = await fetch('https://www.benetamas.com/api/welcome');
      const photos = await response.json();

      if (!photos.length) return;

      this.setState({ photos });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <Wrapper>
        <div className="start-page-container">
          <ul className="start-page-photos" onClick={this.handleClick}>
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
                <a href="#/architecture">WORKS</a>
              </li>
            </ul>
          </nav>
        </div>
      </Wrapper>
    );
  }
}

export default StartPage;
