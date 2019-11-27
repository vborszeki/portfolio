import React, { useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import StartPage from '../StartPage/StartPage';
import Bio from '../Bio/Bio';
import Works from '../Works/Works';
import Project from '../Project/Project';
import StartPageMobile from '../StartPageMobile/StartPageMobile';
import ProjectMobile from '../ProjectMobile/ProjectMobile';
import useIsMobile from './useIsMobile';

const App = () => {
  const [language, setLanguage] = useState('en');
  const [isCategoryOpen, setIsCategoryOpen] = useState({
    architecture: false,
    installation: false,
    object: false,
    experiment: false,
    contact: false,
    links: false
  });
  const [projects, setProjects] = useState({
    architecture: [],
    installation: [],
    object: [],
    experiment: []
  });
  const categories = ['architecture', 'installation', 'object', 'experiment'];

  const fetchProjects = async category => {
    try {
      const response = await fetch(
        `https://www.benetamas.com/api/category/${category}`
      );
      const categoryData = await response.json();
      const projectData = categoryData.projects.map(project => ({
        id: project.id,
        title: project.title,
        friendlyUrlTitle: project.friendlyUrlTitle
      }));
      setProjects({ ...projects, [category]: projectData });
    } catch (err) {
      console.error(err);
    }
  };

  const toggleLanguage = e => {
    const lang = language === 'hu' ? 'en' : 'hu';

    if (e.type === 'click') {
      setLanguage(lang);
    } else if (e.key === 'Enter') {
      setLanguage(lang);
    }
  };

  const toggleCategory = category => {
    if (categories.includes(category) && !isCategoryOpen[category]) {
      fetchProjects(category);
    }

    setIsCategoryOpen({
      ...isCategoryOpen,
      [category]: !isCategoryOpen[category]
    });
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
              language={language}
              toggleLanguage={toggleLanguage}
            />
          )}
        />
        <Route
          exact
          path="/*"
          render={() => (
            <StartPageMobile
              isCategoryOpen={isCategoryOpen}
              toggleCategory={toggleCategory}
              projects={projects}
              setProjects={setProjects}
              language={language}
              toggleLanguage={toggleLanguage}
            />
          )}
        />
      </Switch>
    </Router>
  ) : (
    <Router>
      <LastLocationProvider>
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
      </LastLocationProvider>
    </Router>
  );
};

export default App;
