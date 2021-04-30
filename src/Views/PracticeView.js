import React, { useState, useEffect } from "react"

//components 
import { getExercisesBySessionId } from "../components/modules/SessionManager"
import { PracticeNoteCard } from "../components/notes/PracticeNoteCard"
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
        newNote[event.target.id.split("--")[0]]= selectedVal
        setNote(newNote)
        console.log(selectedVal)
        console.log(note)
    }


    //When the check box is clicked, I need it to look to the note state. 
    //IF there are notes that have been written, the exerciseId needs to be taken, the notes need to be saved to the database along with the date that the box is checked.
    //IF there is no text in the text field, trigger a window alert that tells the user to input notes on progress.
    const handleCheckboxClick =(event) =>{
        event.preventDefault()
        setIsLoading(true)

        const completion_date = note.completion_date
        const progressNote = note.progressNote 
        const exerciseId = event.target.id

        if (progressNote === "") {
            window.alert("Add some notes about your progress")
         } else {
            // addNote()
        }



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
                        handleCheckboxClick={handleCheckboxClick}
                        handleControlledInputChange={handleControlledInputChange}
                    />)}
            </div>
        </>
    )
}