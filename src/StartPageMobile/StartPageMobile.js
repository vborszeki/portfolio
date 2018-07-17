import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './startPageMobile.css';

class StartPageMobile extends Component {
  constructor() {
    super();
    this.state = {
      projectTitles: {}
    };
  }

  componentDidMount() {
    fetch('https://benetamas.com/api/first')
      .then(res => res.json())
      .then(json =>
        this.setState({
          projectTitles: {
            architecture:
              this.getFirstProjectOfCategory(json.projects, 'architecture') ||
              'project',
            installation:
              this.getFirstProjectOfCategory(json.projects, 'installation') ||
              'project',
            object:
              this.getFirstProjectOfCategory(json.projects, 'object') ||
              'project',
            experiment:
              this.getFirstProjectOfCategory(json.projects, 'experiment') ||
              'project'
          }
        })
      )
      .catch(console.error);
  }

  getFirstProjectOfCategory(projects, category) {
    return projects.find(project => project.categoryName === category).project
      .friendlyUrlTitle;
  }

  render() {
    const { projectTitles } = this.state;

    return (
      <ul className="start-page-mobile">
        <li className="start-page-mobile__category">
          <Link to={`/architecture/${projectTitles.architecture}`}>
            ARCHITECTURE
          </Link>
        </li>
        <li className="start-page-mobile__category">
          <Link to={`/installation/${projectTitles.installation}`}>
            INSTALLATION
          </Link>
        </li>
        <li className="start-page-mobile__category">
          <Link to={`/object/${projectTitles.object}`}>OBJECT</Link>
        </li>
        <li className="start-page-mobile__category">
          <Link to={`/experiment/${projectTitles.experiment}`}>EXPERIMENT</Link>
        </li>
        <li className="start-page-mobile__title">CONTACT</li>
        <li className="start-page-mobile__phone">
          <a href="tel:+36-70-633-8750">0036706338750</a>
        </li>
        <li>
          <a href="mailto:info@benetamas.com">INFO@BENETAMAS.COM</a>
        </li>
        <li className="start-page-mobile__address">
          1114 BUDAPEST VASARHELYI PAL U. 10.
        </li>
        <li className="start-page-mobile__title">LINKS</li>
        <li>
          <a
            href="http://viztorony.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            VIZTORONY.IO
          </a>
        </li>
        <li>
          <a
            href="http://palma.studio.hu"
            target="_blank"
            rel="noopener noreferrer"
          >
            PALMA.STUDIO.HU
          </a>
        </li>
        <li>
          <a
            href="http://studiob.mome.hu"
            target="_blank"
            rel="noopener noreferrer"
          >
            STUDIOB.MOME.HU
          </a>
        </li>
        <li className="start-page-mobile__title">BENETAMAS</li>
      </ul>
    );
  }
}

export default StartPageMobile;
