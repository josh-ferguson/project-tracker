import React, {useState, useEffect} from "react";
import { useParams, useHistory } from 'react-router-dom';
import { EditModal } from "../../components/EditModal/EditModal";
import { ProjectInfo } from "../../components/ProjectInfo/ProjectInfo";


export const ProjectFeatures = ({projects, editInfo, projectCompleted, removeProject}) => {
    const { projectNameParams } = useParams();
    const history = useHistory();

    // useStates
    const [project, setProject] = useState({});
    const [modalActive, setModalActive] = useState(false);
    const [projectName, setProjectName] = useState(project.projectName);
    const [description, setDescription] = useState(project.description);
    const [isCompleted, setIsCompleted] = useState("")

    useEffect(() => {
        try {
            setProject(projects[projects.findIndex(project => project.projectName === projectNameParams)]);
            setProjectName(project.projectName);
            setDescription(project.description);
            setIsCompleted(projects[projects.findIndex(project => project.projectName === projectNameParams)].completed);
        } catch (error) {
            history.push("/pageNotFound");
        }
    }, [project, projects, projectNameParams])

    const handleEditBtn = () => {
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
        history.push(newPath);
        setModalActive(false);
    }

    const handleComplete = () => {
        projectCompleted(projectName);
        setIsCompleted(projects[projects.findIndex(project => project.projectName === projectName)].completed)
    }

    const handleRemoveClick = () => {
        if (window.confirm("Are you sure you want to delete the project?") === true) {
            removeProject(projectName);
            history.push("/allProjects")
        }
    }
    
    return (
        <div>
            <section className="projectInfo">
                <ProjectInfo 
                    projectName={projectName} 
                    projectDescription={description}
                    handleEditBtn={handleEditBtn}
                    handleComplete={handleComplete}
                    isCompleted={isCompleted}
                    handleRemoveClick={handleRemoveClick}
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