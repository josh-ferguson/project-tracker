import React from "react";
import { NavLink } from "react-router-dom";


export const PageNotFound = () => {

    return (
        <div className="pageNotFound">
            <h2>Page Not Found</h2>
            <NavLink to="/allProjects" exact>back to home page</NavLink>
        </div>
    )
}