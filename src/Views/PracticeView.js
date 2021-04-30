import React, { useState, useEffect } from "react"

//components 
import { getExercisesBySessionId } from "../components/modules/SessionManager"
import { PracticeNoteCard } from "../components/notes/PracticeNoteCard"
//I need the state to be the sessionId and a state for the exercises (from the session_exercise fetch call)
//the sessionId state will be used to make the exercise fetch call, setting the state for the "exercises". 
//The exercise state will be passed to the PracticeNoteCard to be displayed within this list view.
//STRETCH= have the name of the session at the top

export const PracticeView = ({ sessionId }) => {

    const [exercises, setExercises] = useState([])

    //What I need: The exercise objects to pass into the PracticeNoteCard.
    //This returns an array of objects with nested exercise objects within each element
    //I need an array of just the exercise objects. 
    const getSessionExercises = (id) => {
        let exerciseObjArray = [...exercises]
        getExercisesBySessionId(id)
            .then(response => {
                response.map(res => {
                exerciseObjArray.push(res.exercise)
            })
            setExercises(exerciseObjArray)
            })
    }

    useEffect(() => {
        getSessionExercises(sessionId);
    }, [])

    return (
        <>
            <h1>Practice View</h1>
            <div className="container-cards">
                {exercises.map(exercise =>
                    <PracticeNoteCard
                        key={exercise.id}
                        exercise={exercise}
                    />)}
            </div>
        </>
    )
}