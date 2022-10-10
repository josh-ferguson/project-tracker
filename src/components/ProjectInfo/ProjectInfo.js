import React from "react";
import { useHistory } from 'react-router-dom';

import "./ProjectInfo.css"
import 'font-awesome/css/font-awesome.min.css';

export const ProjectInfo = ({projectName, projectDescription, handleEditBtn}) => {
    let history = useHistory();

        return (
        <div className="projectInfoContainer">
            <div className="backBtn">
                <i className="fa fa-arrow-left fa-3x" onClick={() => history.push("/allProjects")}></i>
            </div>
            {/* ADD classname completed when completed */}
            <div className="projInfo">
                <p className="editBtn" onClick={handleEditBtn}><span>(edit)</span></p>
                <h2>{projectName}</h2>
                <p>{projectDescription}</p>
                <button>Complete</button>
                <button>Delete</button>
            </div>
        </div>
    );
}