import React, { useState } from "react"
import { useHistory } from "react-router"
import "./SessionContainer.css"

//components 
import { SessionExerciseCard } from "../exercises/ExerciseCard"
import { addSession, addSessionExercise } from "../modules/SessionManager"


export const SessionContainer = ({ exercises }) => {

    const currentUser = parseInt(sessionStorage.getItem("app_user_id"))

    const [session, setSession] = useState({
        userId: currentUser,
        name: "",
    })

    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory()

    const handleControlledInputChange = (event) => {

        const newSession = { ...session }
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
                .then(resSession => {
                    const sessId = resSession.id
                    let exerciseIdArray = []
                    exercises.map(exercise => exerciseIdArray.push(exercise.id))

                    for(const id of exerciseIdArray) {
                        let sessionExercise = {
                            sessionId: sessId,
                            exerciseId: id
                        }
                        addSessionExercise(sessionExercise)
                        .then(() => history.push("/room"))
                    }
                })
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