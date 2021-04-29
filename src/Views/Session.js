import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";

//components
import { SessionCard } from "../components/sessions/SessionCard";
import { getAllSessions } from "../components/modules/SessionManager"

export const Session = () => {

    const [sessions, setSessions] = useState([])
    const history = useHistory()
    const userId = sessionStorage.getItem("app_user_id")

    const getSessions = (userId) => {
        return getAllSessions(userId)
        .then(userSessions => {
            setSessions(userSessions)
        })
    }

    return (
        <>
        <h1>Select Your Session</h1>
        <div className="container-cards">
                {sessions.map(session =>
                    <SessionCard
                        key={session.id}
                        session={session}
                        /*handleDeleteSession={handleDeleteSession}*/ />)}
            </div>

        </>
    )
}