import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom"
//components
import {ProgressNoteCard} from "../notes/ProgressNoteCard"
import {getNotesByExercise} from "../modules/NoteManager"
import {deleteNote} from "../modules/NoteManager"
import { getExerciseById } from '../modules/ExerciseManager';

export const ExerciseDetail = () => {

    const { exerciseId } = useParams();
    const history = useHistory()

    const [notes, setNotes] = useState([])
    const [exercise, setExercise] = useState({
        name:"",
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
            <section className="Heading">
                <h1 className="exercise__name">{exercise.name}</h1>
            </section>
            <section className="card">
                <h2>Description</h2>
                <div className="exercise__description">{exercise.description}</div>
                <h3>Progress Notes</h3>
                <div className="progress-cards">
                    {notes.map(note => 
                    <ProgressNoteCard 
                    key={note.id}
                    note={note}
                    handleDeleteNote={handleDeleteNote} />)}
                </div>
            </section>
        </>
    )
}