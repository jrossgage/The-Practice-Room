//Purpose: To grant a logged in user the navigation choices of "Practice Room"
//Sessions, or Create New Exercise

import React from "react";
import { Link } from "react-router-dom"
//header should be a nav bar export 
export const LandingPage = () => {
    return (
        <>
            <div className="hero is-primary">
                <h1 className="hero-body">
                    <p className="title">How Would You Like to Begin Today?</p>
                    </h1>
            </div>
            <div className="block">
                <div className="tile">
                    <div className="tile">
                        <div className="tile is-child box">
                            <h1 className="title"> <Link to="/room">Go to My Practice Room</Link></h1>
                        </div>
                    </div>

                    <div className="tile">
                        <div className="tile is-child box">
                            <h1 className="title"><Link to="/sessions">Go to My Sessions</Link></h1>
                        </div>
                    </div>

                    <div className="tile">
                        <div className="tile is-child box">
                            <h1 className="title"><Link to="/exercise/create">Create New Exercise</Link></h1>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}