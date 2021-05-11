import React, { useState, useEffect } from "react"
import { useHistory } from "react-router"

//components 
import { getExercisesBySessionId } from "../components/modules/SessionManager"
import { PracticeNoteCard } from "../components/notes/PracticeNoteCard"
import { Metronome } from "../components/met/Metronome"
//I need the state to be the sessionId and a state for the exercises (from the session_exercise fetch call)
//the sessionId state will be used to make the exercise fetch call, setting the state for the "exercises". 
//The exercise state will be passed to the PracticeNoteCard to be displayed within this list view.
//STRETCH= have the name of the session at the top

export const PracticeView = ({ sessionId }) => {

    const [exercises, setExercises] = useState([])

    const history = useHistory()

    //This function grabs exercises tied to a specific session via a fetch call to session_exercises
    //a copy of the exercise array is declared then the response is mapped over, an key value of isComplete declared, and the exercises stored in their own array.
    //State is then set using that array of exercise Objects.
    const getSessionExercises = (id) => {
        let exerciseObjArray = [...exercises]
        getExercisesBySessionId(id)
            .then(response => {
                response.map(res => {
                    res.exercise.isComplete = false
                   return (
                       exerciseObjArray.push(res.exercise)
                       )
                })
                setExercises(exerciseObjArray)
            })
    }

    //When the user clicks the go back button, they will return to sessions.
    const handleClickGoBack = (event) => {
        history.push("/sessions")
        }

    useEffect(() => {
        getSessionExercises(sessionId);
    }, [])

    //This checks to see if the exercises array contains any elements and if the exercises contained with have a isComplete value of true.
    //Once that requirement is met, the user is directed back to the session view.
    useEffect(() => {
        if (exercises.length > 0 && exercises.every(exercise => exercise.isComplete === true)) {
            history.push(`/sessions`)
        }
    }, [exercises])

    //This takes in an index value of the specific exercise within the array. Then sets the isComplete key value to true. Updates state with the new value.
    const updateCompletedExercise = (indexPosition) => {
        const copyOfExercises = [...exercises]
        copyOfExercises[indexPosition].isComplete = true 
        setExercises(copyOfExercises)
    }

    return (
        <>
             <div className="hero is-small is-primary">
                <h2 className="hero-body">
                    <p className="title">Practice View</p>
                </h2>
            </div>

            
                <button className="button is-light" onClick={handleClickGoBack}>View Sessions Without Saving</button>
            <div className="container-cards">
                {exercises.map((exercise, index) =>
                    <PracticeNoteCard
                        key={exercise.id}
                        index={index}
                        updateCompletedExercise={updateCompletedExercise}
                        exercise={exercise}
                    />)}
            </div>

            <Metronome />
        </>
    )
}