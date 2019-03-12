import React, { useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import StartPage from '../StartPage/StartPage';
import Bio from '../Bio/Bio';
import Works from '../Works/Works';
import Project from '../Project/Project';
import StartPageMobile from '../StartPageMobile/StartPageMobile';
import ProjectMobile from '../ProjectMobile/ProjectMobile';
import useIsMobile from './useIsMobile';

const App = () => {
  const [language, setLanguage] = useState('hu');

  const toggleLanguage = () => {
    const lang = language === 'hu' ? 'en' : 'hu';
    setLanguage(lang);
  };

  const isMobile = useIsMobile();

  return isMobile ? (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <StartPageMobile />} />
        <Route
          exact
          path="/:category/:projectTitle"
          render={({ match }) => (
            <ProjectMobile
              category={match.params.category}
              projectTitle={match.params.projectTitle}
              toggleLanguage={toggleLanguage}
              language={language}
            />
          )}
        />
        <Route exact path="/*" render={() => <StartPageMobile />} />
      </Switch>
    </Router>
  ) : (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <StartPage />} />
        <Route
          exact
          path="/bio"
          render={({ match }) => (
            <Bio toggleLanguage={toggleLanguage} language={language} />
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
              toggleLanguage={toggleLanguage}
              language={language}
            />
          )}
        />
        <Route exact path="/*" render={() => <StartPage />} />
      </Switch>
    </Router>
  );
};

export default App;
