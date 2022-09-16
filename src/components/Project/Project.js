import React from "react";

import "./Project.css";

export const Project = ({value}) => {
    const valueArray = Object.values(value);
    console.log(valueArray)

    return (
        <div className="projectbox-container">
            <p className="tick">Tick</p>
            <div className="project-container">
                {valueArray.map((val, index) => {
                    if (index === 0) {
                        return (
                        <p className="project-title" key={index}>
                            {val}
                        </p>
                        );
                    } else {
                        return (
                        <p className="project-description" key={index}>
                            {val}
                        </p>
                        );
                    }
                })}
            </div>
            <p className="remove">remove</p>
        </div>
            

    );
};