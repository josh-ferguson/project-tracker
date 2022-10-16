import React from "react";

import "./AddFeatureForm.css";

export const AddFeatureForm = ({handleFeatureChange, handleAddFeatureSubmit, currentFeature}) => {
  
    return (
        <div className="addFeatureFormContainer">
            <form onSubmit={handleAddFeatureSubmit}>
                <input 
                    value={currentFeature}
                    type="text"
                    placeholder="Add Feature..."
                    onChange={handleFeatureChange}
                    required
                />    
                <input type="submit" value={"+"}/>
            </form>
        </div>
    );
  };