import React from "react";
import { useParams } from 'react-router-dom';
import { ProjectInfo } from "../../components/ProjectInfo/ProjectInfo";


export const ProjectFeatures = ({projects}) => {
    const { projectNameParams } = useParams();

    const project = projects[projects.findIndex(project => project.projectName === projectNameParams)];
    
    return (
        <div>
            <section className="projectInfo">
                <ProjectInfo project={project}/>
            </section>
        </div>
    )
}