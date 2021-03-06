import React, { useState, useEffect } from "react";

//components
import { SessionCard } from "../components/sessions/SessionCard";
import { getAllSessions, deleteSession } from "../components/modules/SessionManager"

export const Session = ({ handleBeginButton }) => {

    const [sessions, setSessions] = useState([])
    const currentUserId = sessionStorage.getItem("app_user_id")

    const getSessions = (userId) => {
        return getAllSessions(userId)
            .then(userSessions => {
                setSessions(userSessions)
            })
    }

    const handleDeleteSession = (sessionId) => {
        deleteSession(sessionId)
            .then(() => getSessions(currentUserId));
    }

    //What I want to do= pass the names of the exercises contained within a session to practiceNoteCard to be displayed on the Practice View Page.
    //What I have= a session id from the click event on the Begin button.
    //What I need= the exercise names to display within the card.


    //I need to take the session id from the selected session.
    //Then pass that id into the Practice View.
    //Within Practice View, the session id must be used to make a fetch call to session_exercises.
    //That will return an array of objects containing the needed name exercises.

    useEffect(() => {
        getSessions(currentUserId)
    }, [])

    return (
        <>
            <section className="hero is-small">
                <div className="hero-body">
                    <h1 className="title">Select Your Session</h1>
                </div>
            </section>
            <div className="exercise_categories_container">
                {sessions.map(session =>
                    <SessionCard
                        key={session.id}
                        session={session}
                        handleDeleteSession={handleDeleteSession}
                        handleBeginButton={handleBeginButton} />)}
            </div>

        </>
    )
}