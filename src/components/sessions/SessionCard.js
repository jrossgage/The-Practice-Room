import React from "react"

//Right now just the session data is being passed into the Card. To retrieve the names of the exercises I would need to pass in exercise or session_exercise data.

export const SessionCard = ({ session, handleDeleteSession, handleBeginButton }) => {

    return (
        <div className="card">
            <div className="card-content">
                <h3>Name:
                    <span className="card-sessionName">{session.name}</span></h3>
                {/* <p>Date: </p> */}

                <button type="button" onClick={() => handleBeginButton(session.id)}>Begin!</button>
                <button type="button" onClick={() => handleDeleteSession(session.id)}>Delete</button>

            </div>
        </div>
    );
}