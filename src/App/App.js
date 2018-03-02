import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import StartPage from '../StartPage/StartPage';
import Bio from '../Bio/Bio';
import Works from '../Works/Works';

class App extends Component {
  constructor() {
    super();
    this.state = {
      language: 'hu'
    };
  }

  toggleLanguage() {
    const language = this.state.language === 'hu' ? 'en' : 'hu';

    this.setState({ language });
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => <StartPage />} />
          <Route
            exact
            path="/bio"
            render={({ match }) => (
              <Bio
                toggleLanguage={() => this.toggleLanguage()}
                language={this.state.language}
              />
            )}
          />
          <Route exact path="/works" render={({ match }) => <Works />} />
        </div>
      </Router>
    );
  }
}

export default App;
