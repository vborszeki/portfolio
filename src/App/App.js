import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import StartPage from '../StartPage/StartPage';
import Bio from '../Bio/Bio';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => <StartPage />} />
          <Route exact path="/bio" render={({ match }) => <Bio />} />
        </div>
      </Router>
    );
  }
}

export default App;
