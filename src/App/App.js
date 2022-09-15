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
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <NavLink to="/allProjects" exact>Project Tracker</NavLink>
            </li>
          </ul>
        </nav>
        <main>
        <Switch>
          <Route exact path={"/"}>
            <Redirect to="/allProjects" />
          </Route>
          <Route path={"/allProjects"}>
            <AllProjects />
          </Route>
          <Route path={"/projectFeatures"}>
            <ProjectFeatures />
          </Route>
        </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
