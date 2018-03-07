import { projectsPlaceholder } from './projectsPlaceholder';

export function placeProjectsInGrid(projects) {
  const numberOfProjects = projects.length;
  let randomPlaces = [];
  let paddedProjects = [...projectsPlaceholder];

  if (numberOfProjects === 16) {
    return projects;
  }

  while (randomPlaces.length < numberOfProjects) {
    let randomInt = Math.floor(Math.random() * 16);

    if (!randomPlaces.includes(randomInt)) {
      randomPlaces.push(randomInt);
    }
  }

  randomPlaces.sort((a, b) => a - b).forEach((place, index) => {
    paddedProjects.splice(place, 1, projects[index]);
  });

  return paddedProjects;
}
