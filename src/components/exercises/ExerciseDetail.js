import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom"
//components
import { ProgressNoteCard } from "../notes/ProgressNoteCard"
import { getNotesByExercise } from "../modules/NoteManager"
import { deleteNote } from "../modules/NoteManager"
import { getExerciseById } from '../modules/ExerciseManager';

export const ExerciseDetail = () => {

    const { exerciseId } = useParams();
    const history = useHistory()

    const [notes, setNotes] = useState([])
    const [exercise, setExercise] = useState({
        name: "",
        description: "",
        exerciseId: exerciseId
    })

    //for deleting a note
    const handleDeleteNote = (id) => {
        deleteNote(id)
            .then(() => getNotesByExercise(exerciseId))
            .then(result => setNotes(result))
    }

    useEffect(() => {
        getExerciseById(exerciseId)
            .then(exercise => {
                setExercise(exercise)
            })
        getNotesByExercise(exerciseId)
            .then(notes => {
                setNotes(notes)
            });
    }, [exerciseId])

    return (
        <>
            <section className="hero is-small is-primary">
                <h1 className="hero-body">
                    <p className="title">{exercise.name}
                    </p>
                </h1>
            </section>
            <section className="section">
                <h2 className="subtitle is-3">Description</h2>
                <div className="subtitle is-5">{exercise.description}</div>
            </section>
            <section className="section">
                <h3 className="subtitle is-4a">Progress Notes</h3>
                <div className="card is-light">
                    {notes.map(note =>
                        <ProgressNoteCard
                            key={note.id}
                            note={note}
                            handleDeleteNote={handleDeleteNote} />)}
                </div>
                <button className="button is-primary" type="button" onClick={() => history.push(`/room`)}>Return</button>
            </section>
        </>
    )
}