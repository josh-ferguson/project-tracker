import React from "react";

import "./EditModal.css";

export const EditModal = (
    {
        projectName, 
        projectDescription, 
        handleNameChange, 
        handleDescChange, 
        handleSubmit,
        handleModalClose
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
                    <textarea
                        value={projectDescription}
                        onChange={handleDescChange}
                        required
                    ></textarea>
                    <input type="submit" value={"Save"}/>
                </form>
            </div>
        </div>
    );
}