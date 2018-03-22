import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import StartPage from '../StartPage/StartPage';
import Bio from '../Bio/Bio';
import Works from '../Works/Works';
import Project from '../Project/Project';

class App extends Component {
  constructor() {
    super();
    this.state = {
      language: 'hu',
      width: window.innerWidth
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  toggleLanguage() {
    const language = this.state.language === 'hu' ? 'en' : 'hu';

    this.setState({ language });
  }

  render() {
    const isMobile = this.state.width <= 500;

    if (isMobile) {
      return (
        <h1>
          <span role="img" aria-label="mobile phone">
            📱
          </span>
        </h1>
      );
    } else {
      return (
        <Router>
          <Switch>
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
              path="/:category"
              render={({ match }) => <Works category={match.params.category} />}
            />
            <Route
              exact
              path="/:category/:projectTitle"
              render={({ match }) => (
                <Project
                  category={match.params.category}
                  projectTitle={match.params.projectTitle}
                  toggleLanguage={() => this.toggleLanguage()}
                  language={this.state.language}
                />
              )}
            />
          </Switch>
        </Router>
      );
    }
  }
}

export default App;
