import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

//components
import {getNotesByExercise} from "../modules/NoteManager"

//What I want to do: Display the date of the last time a note was logged for a practice exercise.
//What has to happen: I need the most recent note created for an exercise.
//How can I get that?: Notes are tied to an exercise via the exercise Id. Through the getNotesByExercise function, I can return an array of notes
// specific to an exercise.
// That array can then be sorted with the most recent note displaying first.
// Then, with the most recent note being the first element of the array [0], I can select the date (notes[0].completion_date) and interpolate onto the card.

//What I need: a note array state, sorted by date, being passed into this component
export const ExerciseCard = ({ exercise, handleDeleteExercise, handleAddToSession }) => {

    const [note, setNote] = useState({}) 
    const history = useHistory()

    const getRelatedNote = () => {
        getNotesByExercise(exercise.id)
        .then(response => {
            setNote(response[response.length-1])
    })
}


    useEffect(() => {
       getRelatedNote()
    }, [exercise]);

    return (
        <div className="card">
            <div className="card-content">
                <h3> <span className="card-exerciseName">
                    {exercise.name} </span></h3>
                <p>Last Practiced: { note ? note?.completion_date : "Not Yet Practiced"}</p>

                <button type="button" onClick={() => handleAddToSession(exercise.id)}>Add to Session</button>
                
                <Link to={`/exercise/${exercise.id}`}>
                    <button>View</button>
                </Link>

                <button type="button" onClick={() => handleDeleteExercise(exercise.id)}>Delete</button>


                <button type="button"
                    onClick={() => history.push(`/exercise/${exercise.id}/edit`)}>
                    Edit
                </button>

            </div>
        </div>
    );      
}

export const SessionExerciseCard = ({ exercise }) => {

    const history = useHistory()

    return (
        <div className="card">
         
            <div className="card-content">
                <h3 className="card-exerciseName">{exercise.name}</h3>
            </div>
        </div>
    );
            }