import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect, 
  NavLink
} from "react-router-dom";

import { AllProjects } from "../containers/AllProjects/AllProjects";
import { PageNotFound } from "../containers/PageNotFound/PageNotFound";
import { ProjectFeatures } from "../containers/ProjectFeatures/ProjectFeatures";

import './App.css';


function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('projects'));
    if (items.length > 0) {
      setProjects(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (projectName, description) => {
    setProjects([
      {
        projectName: projectName,
        description: description,
        features: [],
        completed: false
      },
      ...projects
    ])
  }

  const removeProject = (projectName) => {
    setProjects(projects.filter(project => project.projectName !== projectName));
  }

  const projectCompleted = (projectName) => {
    setProjects(current =>
      current.map(obj => {
        if (obj.projectName === projectName) {
          return {...obj, completed: !obj.completed};
        }

        return obj;
      }),
    );
  }

  const editInfo = (prevName, newName, newDesc) => {

    setProjects(current =>
      current.map(obj => {
        if (obj.projectName === prevName) {
          return {...obj, projectName: newName, description: newDesc};
        }

        return obj;
      }),
    );

  }

  const addFeature = (projectName, feature) => {
    setProjects(current =>
      current.map(obj => {
        if (obj.projectName === projectName) {
          obj.features.push(feature);
        } 
        console.log(projects)
        return obj;
      }),
    );
  }

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <NavLink className={"logo"} to="/allProjects" exact>Project Tracker</NavLink>
            </li>
          </ul>
        </nav>
        <main>
        <Switch>
          <Route exact path={"/"}>
            <Redirect to="/allProjects" />
          </Route>
          <Route exact path={"/projectFeatures"}>
            <Redirect to="/allProjects" />
          </Route>
          <Route path={"/allProjects"}>
            <AllProjects 
              projects={projects} 
              addProject={addProject} 
              removeProject={removeProject}
            />
          </Route>
          <Route path={"/projectFeatures/:projectNameParams"}>
            <ProjectFeatures 
              projects={projects} 
              editInfo={editInfo}
              projectCompleted={projectCompleted}
              removeProject={removeProject}
              addFeature={addFeature}
            />
          </Route>
          <Route path={"/pageNotFound"}>
            <PageNotFound />
          </Route>
        </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
