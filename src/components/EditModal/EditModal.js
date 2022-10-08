import React from "react";

import "./EditModal.css";

export const EditModal = (
    {
        projectName, 
        projectDescription, 
        handleNameChange, 
        handleDescChange, 
        handleSubmit
    }
    ) => {
    return (
        <div className="editModal">
            <div className="editModalContainer">
            <form onSubmit={handleSubmit}>
                <h2>Name</h2>
                <input 
                    value={projectName}
                    type="text"
                    onChange={handleNameChange}
                    required
                />
                <h2>Description</h2>
                <input 
                    value={projectDescription}
                    type="text"
                    onChange={handleDescChange}
                    required
                />
                <input type="submit" value={"Save"}/>
            </form>
            </div>
        </div>
    );
}