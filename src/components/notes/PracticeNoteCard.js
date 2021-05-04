import React, { useState, useEffect } from "react"
import { useHistory } from "react-router"
import "./PracticeNoteCard.css"
//components
import {addNote} from "../modules/NoteManager"

export const PracticeNoteCard = ({ exercise, index, updateCompletedExercise }) => {

    //grabbing the current logged in user from sessionStorage
    const currentUserId = parseInt(sessionStorage.getItem("app_user_id"))

    //the state of note is declared within the card component to allow the state to be specfic to the card
    const [note, setNote] = useState({
        userId: currentUserId,
        completion_date: 0,
        progressNote: "",
        exerciseId: exercise.id
    })
    const history = useHistory()

    //Handles the input for the text field. Will update the "progressNote" of the note state when anything is inputted into the field
    const handleControlledInputChange = (event) => {

        const newNote = { ...note }
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newNote[event.target.id.split("--")[0]] = selectedVal
        setNote(newNote)
    }

    //event handler for the checkbox. Creates a newNote obj and POST's it the the database. After, the note state is set, checkbox is disabled, 
    //and updateCompletedExercise is called with the exercise Index.
    const handleCheckboxClick = (event) => {

        if (note.progressNote === "") {
            window.alert("Add some notes about your progress");
        }
        else {
            const newNote = {
                completion_date: new Date().toDateString(),
                progressNote: note.progressNote,
                exerciseId: exercise.id
            }
            addNote(newNote)
            .then(data => {
                setNote(data)
                event.target.disabled = true
                updateCompletedExercise(index)
            })
        }

    }

    return (
        <div className="card">
            <div className="card-content">
                <h3>
                    <span className="card-exerciseName">
                        {exercise.name}
                    </span></h3>
                <div className="button-inputs">
                    <input type="text" id="progressNote" onChange={handleControlledInputChange} required autoFocus
                        className="form-control" placeholder="Progress Notes" value={note.progressNote} />
                    <p>
                        <input type="checkbox" id="completed" onChange={handleCheckboxClick} checked={note.completion_date !== 0} />
                        Completed
                    </p>
                </div>

            </div>
        </div>
    );
}
