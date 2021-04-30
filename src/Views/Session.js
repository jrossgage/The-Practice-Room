import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";

//components
import { SessionCard } from "../components/sessions/SessionCard";
import { getAllSessions, deleteSession } from "../components/modules/SessionManager"

export const Session = ({ handleBeginButton }) => {

    const [sessions, setSessions] = useState([])
    const history = useHistory()
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
        <h1>Select Your Session</h1>
        <div className="container-cards">
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