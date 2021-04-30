import React, { useState, useEffect } from "react"
import { useHistory } from "react-router"

export const PracticeNoteCard = ({ exercise }) => {

    const history = useHistory()

    return (
        <div className="card">
            <div className="card-content">
                <h3>Name: 
                    <span className="card-exerciseName">
                        {exercise.name}
                    </span></h3>
                    <input type="text" id="note" /*onChange={handleControlledInputChange}*/ required autoFocus 
                    className="form-control" placeholder="Progress Notes" />

                    {/* this needs to be a checkbox */}
                {/* <button type="button" onClick={() => handleDeleteExercise(exercise.id)}>Delete</button> */}


            </div>
        </div>
    );
}
