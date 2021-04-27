//Purpose: To grant a logged in user the navigation choices of "Practice Room"
//Sessions, or Create New Exercise

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
//header should be a nav bar export 
export const LandingPage = () => {
    return (
        <>
            <h1>How Would You Like to Begin Today?</h1>

            <div>
                <h3>
                    <Link to="/room">Go to My Practice Room</Link>
                </h3>
            </div>

            <div>
                <h3>
                    <Link to="/sessions">Go to My Sessions</Link>
                </h3>
            </div>

            <div>
                <h3>
                    <Link to="/exercise/create">Create New Exercise</Link>
                </h3>
            </div>

        </>
    )
}