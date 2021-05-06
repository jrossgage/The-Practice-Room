import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
//components
import { getNoteById, updateNote } from "../modules/NoteManager"
import { getExerciseById } from "../modules/ExerciseManager"

export const NoteEditForm = () => {

    const [note, setNote] = useState({
        completion_date: "",
        progressNote: "",
        exerciseId: 0
    })
    const [exercise, setExercise] = useState({
        name: "",
    })
    const [isLoading, setIsLoading] = useState(false);
    const { noteId } = useParams();
    const history = useHistory()

    const handleControlledInputChange = (event) => {

        const newNote = { ...note }
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newNote[event.target.id] = selectedVal
        setNote(newNote)
    }

    const updateExistingNote = (event) => {
        event.preventDefault()
        setIsLoading(true);

        // This is an edit, so we need the id
        const editedNote = {
            id: noteId,
            completion_date: note.completion_date,
            progressNote: note.progressNote,
            exerciseId: note.exerciseId
        };

        updateNote(editedNote)
            .then(() => history.push(`/exercise/${note.exerciseId}`)
            )
    }

    useEffect(() => {
        getNoteById(noteId)
            .then(note => {
                setNote(note)
                getExerciseById(note.exerciseId)
                    .then(exercise => {
                        setExercise(exercise);
                        setIsLoading(false)
                    })
            })
    }, [])


    return (
        <>
            <div className="hero is-small is-primary">
                <h2 className="hero-body">
                    <span className="title">{exercise?.name}</span>
                </h2>
            </div>

            <div className="field">
                    <p className="subtitle is-3">{note?.completion_date}</p>
                <div className="control">
                    <textarea type="textfield" id="progressNote" onChange={handleControlledInputChange}
                        className="textarea" placeholder="progress note" value={note?.progressNote} />
                </div>

                    <div className="control">
                        <button className="button is-primary" disabled={isLoading} type="saveNote-bttn" onClick={updateExistingNote}>Save</button>

                        <button className="button is-light" type="button" onClick={() => history.push(`/exercise/${exercise.id}`)}>Return</button>
                    </div>

            </div>
        </>
    );
}
