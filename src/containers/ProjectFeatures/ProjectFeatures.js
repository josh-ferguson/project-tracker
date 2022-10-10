import React, {useState, useEffect} from "react";
import { useParams, useHistory } from 'react-router-dom';
import { EditModal } from "../../components/EditModal/EditModal";
import { ProjectInfo } from "../../components/ProjectInfo/ProjectInfo";


export const ProjectFeatures = ({projects, editInfo}) => {
    const { projectNameParams } = useParams();
    const history = useHistory();

    // useStates
    const [project, setProject] = useState({});
    const [modalActive, setModalActive] = useState(false);
    const [projectName, setProjectName] = useState(project.projectName);
    const [description, setDescription] = useState(project.description);

    useEffect(() => {
        setProject(projects[projects.findIndex(project => project.projectName === projectNameParams)]);
        setProjectName(project.projectName);
        setDescription(project.description);
        console.log("test");
    }, [project])

    const handleEditBtn = (e) => {
        setModalActive(true);
    }

    const handleNameChange = (e) => {
        setProjectName(e.target.value);
    }

    const handleDescChange = (e) => {
        setDescription(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editInfo(project.projectName, projectName, description)

        let newPath = `/projectFeatures/${projectName}`
        console.log(newPath)
        history.push(newPath);
        setModalActive(false);
    }
    
    return (
        <div>
            <section className="projectInfo">
                <ProjectInfo 
                    projectName={projectName} 
                    projectDescription={description}
                    handleEditBtn={handleEditBtn}
                />
                {modalActive ? <EditModal 
                    projectName={projectName} 
                    projectDescription={description} 
                    handleNameChange={handleNameChange} 
                    handleDescChange={handleDescChange}
                    handleSubmit={handleSubmit}
                /> : null }
            </section>
        </div>
    )
}