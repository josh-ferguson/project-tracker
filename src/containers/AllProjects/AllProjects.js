import React, {useState, useEffect} from "react";

import { ProjectList } from "../../components/ProjectList/ProjectList";
import { ProjectsForm } from "../../components/ProjectsForm/ProjectsForm";

export const AllProjects = (props) => {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [isDuplicate, setIsDuplicate] = useState(false);

    const projectList = props.projects;
    const addProject = props.addProject;
    const removeProject = props.removeProject;

    useEffect(() => {
        if(projectList.filter(project => project.projectName === projectName).length > 0){
            setIsDuplicate(true);
        } else if (projectList.filter(project => project.projectName === projectName).length === 0) {
            setIsDuplicate(false);
        }  
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(!isDuplicate) {
            addProject(projectName, description);
            setProjectName("");
            setDescription("");
        } else {
            alert("Project already exists, try a different name.")
        }
    };

    return (
        <div>
            <section className="projectsFormContainer">
                <ProjectsForm 
                    projectName={projectName}
                    description={description}
                    setProjectName={setProjectName}
                    setDescription={setDescription}
                    handleSubmit={handleSubmit}
                />
            </section>
            <section className="projectList">
                <ProjectList projectList={projectList} removeProject={removeProject}/>
            </section>
        </div>
    )
}