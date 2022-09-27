import React from "react";
import { Project } from "../Project/Project";

import "./ProjectList.css"

export const ProjectList = ({projectList, removeProject}) => {
  return (
    <div className="projectList-container">
        {projectList.map((value, index) => (
            <Project value={value} key={index} removeProject={removeProject} />
        ))}
    </div>
  );
};