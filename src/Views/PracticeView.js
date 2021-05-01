import React, { useState, useEffect } from "react"

//components 
import { getExercisesBySessionId } from "../components/modules/SessionManager"
import { PracticeNoteCard } from "../components/notes/PracticeNoteCard"
import { addNote } from "../components/modules/NoteManager"
import { useHistory } from "react-router"
//I need the state to be the sessionId and a state for the exercises (from the session_exercise fetch call)
//the sessionId state will be used to make the exercise fetch call, setting the state for the "exercises". 
//The exercise state will be passed to the PracticeNoteCard to be displayed within this list view.
//STRETCH= have the name of the session at the top

export const PracticeView = ({ sessionId }) => {

    const currentUserId = parseInt(sessionStorage.getItem("app_user_id"))

    const [exercises, setExercises] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [note, setNote] = useState({
        userId: currentUserId,
        completion_date: 0,
        progressNote: "",
        exerciseId: 0
    })

    const history = useHistory()

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

    const handleControlledInputChange = (event) => {

        const newNote = { ...note }
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newNote[event.target.id.split("--")[0]] = selectedVal
        setNote(newNote)
    }


    //When the check box is clicked, I need it to look to the note state. 
    //IF there are notes that have been written, the exerciseId needs to be taken, the notes need to be saved to the database along with the date that the box is checked.
    //IF there is no text in the text field, trigger a window alert that tells the user to input notes on progress.
    //Store note information into an object and POST that object to the database

    //This needs to set a Checkbox state to allow the DOM to refresh.
    //This will prevent the spamming of the checkbox and the irregularities I'm experiencing.
    const handleCheckboxClick = (event) => {
        event.preventDefault()
        setIsLoading(true)

        const newNote = {
            completion_date: new Date().toDateString(),
            progressNote: note.progressNote,
            exerciseId: event.target.id
        }

        if (newNote.progressNote === "") {
            window.alert("Add some notes about your progress")
        }
        if (event.checked === true) {
            addNote(newNote)
        }



    }

    const handleClickGoBack = (event) => {
        history.push("/sessions")
        }

    useEffect(() => {
        getSessionExercises(sessionId);
    }, [])

    return (
        <>
            <div>
                <h1>Practice View</h1>
                <button onClick={handleClickGoBack}>Go Back without Saving</button>
            </div>
            <div className="container-cards">
                {exercises.map(exercise =>
                    <PracticeNoteCard
                        key={exercise.id}
                        exercise={exercise}
                        isLoading={isLoading}
                        handleCheckboxClick={handleCheckboxClick}
                        handleControlledInputChange={handleControlledInputChange}
                    />)}
            </div>
        </>
    )
}