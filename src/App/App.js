import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect, 
  NavLink
} from "react-router-dom";

import { AllProjects } from "../containers/AllProjects/AllProjects";
import { ProjectFeatures } from "../containers/ProjectFeatures/ProjectFeatures";

import './App.css';


function App() {
  const [projects, setProjects] = useState([]);

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
            />
          </Route>
        </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
