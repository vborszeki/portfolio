import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import StartPage from '../StartPage/StartPage';
import Bio from '../Bio/Bio';
import Works from '../Works/Works';
import Project from '../Project/Project';

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
          <Route
            exact
            path="/category/:category"
            render={({ match }) => <Works category={match.params.category} />}
          />
          <Route
            exact
            path="/category/:category/:projectId"
            render={({ match }) => (
              <Project
                category={match.params.category}
                projectId={match.params.projectId}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
