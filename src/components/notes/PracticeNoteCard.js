import React, { useState, useEffect } from "react"
import { useHistory } from "react-router"
import "./PracticeNoteCard.css"

export const PracticeNoteCard = ({ exercise, handleCheckboxClick, handleControlledInputChange, isLoading }) => {

    const history = useHistory()

    return (
        <div className="card">
            <div className="card-content">
                <h3>Name:
                    <span className="card-exerciseName">
                        {exercise.name}
                    </span></h3>
                <div className="button-inputs">
                    <input type="text" id={`progressNote--${exercise.id}`} onChange={handleControlledInputChange} required autoFocus
                        className="form-control" placeholder="Progress Notes" /*value={}*/ />
                    <p>
                        <input type="checkbox" id={exercise.id} onChange={handleCheckboxClick} />
                        Completed
                    </p>
                </div>

            </div>
        </div>
    );
}
