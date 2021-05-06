import React from "react"

//Right now just the session data is being passed into the Card. To retrieve the names of the exercises I would need to pass in exercise or session_exercise data.

export const SessionCard = ({ session, handleDeleteSession, handleBeginButton }) => {

    return (
        <div className="card">
            <div className="card-content">
                    <span className="card-header-title">{session.name}</span>

                <button className="button is-primary is-small" type="button" onClick={() => handleBeginButton(session.id)}>Begin!</button>
                <button className="button is-light is-small" type="button" onClick={() => handleDeleteSession(session.id)}>Delete</button>

            </div>
        </div>
    );
}