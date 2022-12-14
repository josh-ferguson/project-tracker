import React from "react";
import { NavLink } from 'react-router-dom';

import "./Project.css";
import 'font-awesome/css/font-awesome.min.css';


export const Project = ({value, removeProject}) => {
    const valueArray = Object.values(value);

    const handleRemoveClick = () => {
        if (window.confirm("Are you sure you want to delete the project?") === true) {
            removeProject(valueArray[0]);
        }
    }

    return (
        <div className="projectbox-container">
            {valueArray[3] ? <i className="fa fa-check fa-2x"></i> : null}
            <div className="project-container">
                {valueArray.map((val, index) => {
                    if (index === 0) {
                        return (
                            <NavLink
                            to={`/projectFeatures/${val}`}
                            key={index}
                            >
                            <p className="project-title" key={index}>
                                {val}
                            </p>
                            </NavLink>
                        );
                    } else if(index === 1) {
                        return (
                            <p className="project-description" key={index}>
                                {val}
                            </p>
                        );
                    }
                })}
            </div>
            <p className="remove" onClick={handleRemoveClick}>remove</p>
        </div>
            

    );
};