import React from "react";
import { useHistory } from 'react-router-dom';

import "./ProjectInfo.css"
import 'font-awesome/css/font-awesome.min.css';

export const ProjectInfo = ({project}) => {
    let history = useHistory(); 

    return (
        <div className="projectInfoContainer">
            <div className="backBtn">
                <i className="fa fa-arrow-left fa-3x" onClick={() => history.goBack()}></i>
            </div>
            {/* ADD classname completed when completed */}
            <div className="projInfo">
                <p className="editBtn"><span>(edit)</span></p>
                <h2>{project.projectName}</h2>
                <p>{project.description}</p>
                <button>Complete</button>
                <button>Delete</button>
            </div>
        </div>
    );
}