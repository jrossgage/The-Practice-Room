import React, { useState } from "react"
import { useHistory } from "react-router"
import "./SessionContainer.css"

//To Save the selected exercises to the database (this process will probably utilize promise.all at some point):
//1. Create Session First. Take the currentUserId and the name of the session (inputted in the text bar) and POST it to the database.
//2. The POST fetch call will save the session object to the database and the response will contain that new session object
//3. Obtain the newly created sessionId along with the execerise ids contained within the session container at the time of the click event.
//4. With the sessionId and exerciseId, create and POST a new session_exercises object.
//5. This session_exercises object will tie an exercise to a session it is contained within. (session_exercises will be a large database array)

// 1- to create a session. I will need a handle click event for the save button.
//components 
import { SessionExerciseCard } from "../exercises/ExerciseCard"
import { addSession } from "../modules/SessionManager"


export const SessionContainer = ({ exercises }) => {

        const currentUser = parseInt(sessionStorage.getItem("app_user_id"))
        
        const [session, setSession] = useState({
            userId: currentUser,
            name: "",
        })

        const [isLoading, setIsLoading] = useState(false);
        const history = useHistory()

        const handleControlledInputChange = (event) =>{

            const newSession = {...session}
            let selectedVal = event.target.value
            if (event.target.id.includes("id")) {
                selectedVal = parseInt(selectedVal)
            }
            newSession[event.target.id] = selectedVal
            setSession(newSession)
        }

    const handleClickSessionSave = (event) => {
        event.preventDefault()
        setIsLoading(true)

        const name = session.name

        if (name === "Current Practice Session" || name === "") {
            window.alert("Input a Session Name")
            setIsLoading(false)
        } else {
            addSession(session)
            .then(() => history.push("/room"))
        }
    }

    return (
        <>
            <div className="sessionContainerTitle">
                <h1>Session Container Mounted</h1>
                <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Current Practice Session" value={session.name} />
            </div>
                <div className="container-cards">
                    {exercises.map(exercise =>
                        <SessionExerciseCard
                            key={exercise.id}
                            exercise={exercise}
                        />)}
                </div>

            <button>Begin Practicing!</button>

            <button disabled={isLoading} className="saveSession-bttn"
            onClick={handleClickSessionSave}>Save For Later</button>

            <button>Clear</button>

        </>
    )
}