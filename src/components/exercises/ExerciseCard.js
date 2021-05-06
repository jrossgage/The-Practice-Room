import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

//components
import { getNotesByExercise } from "../modules/NoteManager"

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
                setNote(response[response.length - 1])
            })
    }

    useEffect(() => {
        getRelatedNote()
    }, [exercise]);

    return (
        <div className="card">
            <div className="card-content">
                 <span className="card-header-title">
                    {exercise.name}</span>
                <p className="content">Practiced on {note ? note?.completion_date : "Not Yet Practiced"}</p>

                <div className="card-footer">
                    <a className="button is-small is-primary" type="button" onClick={() => handleAddToSession(exercise.id)}>Add to Session</a>
                    <Link className="button is-small is-light" to={`/exercise/${exercise.id}`}>View</Link>
                    <a className="button is-small is-light" type="button" onClick={() => history.push(`/exercise/${exercise.id}/edit`)}>Edit</a>
                    <a className="button is-small is-light" type="button" onClick={() => handleDeleteExercise(exercise.id)}>Delete</a>
                </div>
            </div>
        </div>
    );
}

export const SessionExerciseCard = ({ exercise }) => {

    return (
        <div className="card">
            <div className="card-content">
                <h3 className="card-exerciseName">{exercise.name}</h3>
            </div>
        </div>
    );
}