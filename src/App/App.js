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
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLinksOpen, setIsLinksOpen] = useState(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [isInstallationOpen, setIsInstallationOpen] = useState(false);
  const [isObjectOpen, setIsObjectOpen] = useState(false);
  const [isExperimentOpen, setIsExperimentOpen] = useState(false);
  const [projects, setProjects] = useState({
    architecture: [],
    installation: [],
    object: [],
    experiment: []
  });

  const fetchProjects = category => {
    fetch(`https://www.benetamas.com/api/category/${category}`)
      .then(res => res.json())
      .then(json =>
        json.projects.map(project => ({
          id: project.id,
          title: project.title,
          friendlyUrlTitle: project.friendlyUrlTitle
        }))
      )
      .then(projectData =>
        setProjects({ ...projects, [category]: projectData })
      )
      .catch(console.error);
  };

  const toggleLanguage = () => {
    const lang = language === 'hu' ? 'en' : 'hu';
    setLanguage(lang);
  };

  const toggleContact = () => {
    setIsContactOpen(!isContactOpen);
  };

  const toggleLinks = () => {
    setIsLinksOpen(!isLinksOpen);
  };

  const toggleArchitecture = () => {
    setIsArchitectureOpen(!isArchitectureOpen);
    fetchProjects('architecture');
  };

  const toggleInstallation = () => {
    setIsInstallationOpen(!isInstallationOpen);
    fetchProjects('installation');
  };

  const toggleObject = () => {
    setIsObjectOpen(!isObjectOpen);
    fetchProjects('object');
  };

  const toggleExperiment = () => {
    setIsExperimentOpen(!isExperimentOpen);
    fetchProjects('experiment');
  };

  const isMobile = useIsMobile();

  return isMobile ? (
    <Router>
      <Switch>
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
        <Route
          exact
          path="/*"
          render={() => (
            <StartPageMobile
              isContactOpen={isContactOpen}
              toggleContact={toggleContact}
              isLinksOpen={isLinksOpen}
              toggleLinks={toggleLinks}
              isArchitectureOpen={isArchitectureOpen}
              toggleArchitecture={toggleArchitecture}
              isInstallationOpen={isInstallationOpen}
              toggleInstallation={toggleInstallation}
              isObjectOpen={isObjectOpen}
              toggleObject={toggleObject}
              isExperimentOpen={isExperimentOpen}
              toggleExperiment={toggleExperiment}
              projects={projects}
              setProjects={setProjects}
            />
          )}
        />
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
