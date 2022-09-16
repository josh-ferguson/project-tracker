import React from "react";

import "./ProjectsForm.css"

export const ProjectsForm = ({
  projectName,
  description,
  setProjectName,
  setDescription,
  handleSubmit,
}) => {

  return (
    <form onSubmit={handleSubmit}>
        <h2>Add Project</h2>
        <input 
            value={projectName}
            type="text"
            placeholder="project name"
            onChange={(e => setProjectName(e.target.value))}
            required
        />
        <textarea 
            value={description}
            placeholder="description" 
            rows="4" 
            cols="50"
            onChange={(e => setDescription(e.target.value))}
            required
        ></textarea>       
        <input type="submit" value={"Add"}/>
    </form>
  );
};