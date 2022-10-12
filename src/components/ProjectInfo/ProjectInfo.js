import React from "react";
import { useHistory } from 'react-router-dom';

import "./ProjectInfo.css"
import 'font-awesome/css/font-awesome.min.css';

export const ProjectInfo = (
    {
        projectName, 
        projectDescription, 
        handleEditBtn, 
        handleComplete, 
        isCompleted,
        handleRemoveClick
    }) => {

    let history = useHistory();

        return (
        <div className="projectInfoContainer">
            <div className="backBtn">
                <i className="fa fa-arrow-left fa-3x" onClick={() => history.push("/allProjects")}></i>
            </div>
            <div className={isCompleted ? "projInfo completed" : "projInfo"}>
                <p className="editBtn" onClick={handleEditBtn}><span>(edit)</span></p>
                <h2>{projectName}</h2>
                <p>{projectDescription}</p>
                <button className={isCompleted ? "btnComplete completedBtn" : "btnComplete"} onClick={handleComplete}>{isCompleted ? "Completed" : "Complete"}</button>
                <button className="btnDelete" onClick={handleRemoveClick}>Delete</button>
            </div>
        </div>
    );
}