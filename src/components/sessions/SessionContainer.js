import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import "./SessionContainer.css"

//components 
import { SessionExerciseCard } from "../exercises/ExerciseCard"
import { addSession, addSessionExercise } from "../modules/SessionManager"


export const SessionContainer = ({ exercises, clearSessionContainer }) => {

    const currentUser = parseInt(sessionStorage.getItem("app_user_id"))

    const [session, setSession] = useState({
        userId: currentUser,
        name: "",
    })

    const [emptyContainer, setEmptyContainer] = useState(true)
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
        } 
        if (event.target.id === "begin") {
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
                        .then(() => history.push("/practice"))
                    }
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
                            setIsLoading(false);
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

                    <button disabled={emptyContainer} className="beginPractice=bttn" id="begin" 
                    onClick={handleClickSessionSave}>Begin Practicing!</button>

                    <button disabled={emptyContainer} className="saveSession-bttn" id="saveLater"
                        onClick={handleClickSessionSave}>Save For Later</button>

                    <button className="clearSession-bttn" id="clear" 
                    onClick={() => clearSessionContainer()}>Clear Session</button>

                </>
            )
        }