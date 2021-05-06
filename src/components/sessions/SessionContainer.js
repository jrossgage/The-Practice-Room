import React, { useEffect, useState } from "react"
import "./SessionContainer.css"

//components 
import { SessionExerciseCard } from "../exercises/ExerciseCard"
import { addSession, addSessionExercise } from "../modules/SessionManager"


export const SessionContainer = ({ exercises, clearSessionContainer, handleBeginButton }) => {

    const currentUser = parseInt(sessionStorage.getItem("app_user_id"))

    const [session, setSession] = useState({
        userId: currentUser,
        name: "",
    })

    const [emptyContainer, setEmptyContainer] = useState(true)

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

        const name = session.name

        if (name === "Name Your Session" || name === "") {
            return window.alert("Input a Session Name")
        }
        if (event.target.id === "begin") {
            addSession(session)
                .then(resSession => {
                    const sessId = resSession.id
                    let exerciseIdArray = []
                    exercises.map(exercise => exerciseIdArray.push(exercise.id))

                    const promiseArray = []
                    for(const id of exerciseIdArray) {
                        let sessionExercise = {
                            sessionId: sessId,
                            exerciseId: id
                        }
                        promiseArray.push(addSessionExercise(sessionExercise))
                    }
                    Promise.all(promiseArray)
                    .then((data) => handleBeginButton(sessId)
                    )
                })
            }
            if (event.target.id === "saveLater") {
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
                        .then(() => {
                            const session = {
                                userId: currentUser,
                                name: ""
                            }
                            setSession(session);
                            clearSessionContainer();
                            setEmptyContainer(true)
                        })
                    }
                })
            }
        }

        const checkContainer = () => {
            if(exercises.length > 1) {
                setEmptyContainer(false)
            }
        }
        
        useEffect(() => {
            checkContainer();
        }, [exercises])
        
            return (
                <>
                    <div className="field">
                        <h1 className="subtitle is-3">Create a Session</h1>
                        <input type="text" id="name" onChange={handleControlledInputChange} className="text" placeholder="Name Your Session" value={session.name} />
                    </div>
                    <div className="container-cards">
                        {exercises.map(exercise =>
                            <SessionExerciseCard
                                key={exercise.id}
                                exercise={exercise}
                            />)}
                    </div>

                    <button disabled={emptyContainer} className="button is-primary" id="begin" 
                    onClick={handleClickSessionSave}>Begin Practicing!</button>

                    <button disabled={emptyContainer} className="button is-light" id="saveLater"
                        onClick={handleClickSessionSave}>Save For Later</button>

                    <button className="button is-light" id="clear" 
                    onClick={() => clearSessionContainer()}>Clear Session</button>

                </>
            )
        }