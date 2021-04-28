import React from "react";
import { Link, useHistory } from "react-router-dom";

export const ExerciseCard = ({ exercise, handleDeleteExercise, handleAddToSession }) => {

    const history = useHistory()

    return (
        <div className="card">
            <div className="card-content">
                <h3>Name:
                    <span className="card-exerciseName">
                    {exercise.name}
                </span></h3>
                <p>Date: </p>

                <button type="button" onClick={() => handleAddToSession(exercise.id)}>Add to Session</button>
                
                {/* <Link to={`/exercise/${exercise.id}`}>
                    <button>View</button>
                </Link> */}

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
                <h3>Name:
                    <span className="card-exerciseName">
                    {exercise.name}
                </span></h3>
                {/* <p>Date: </p>

                <button type="button" onClick={() => handleAddToSession(exercise.id)}>Add to Session</button>
                
                {/* <Link to={`/exercise/${exercise.id}`}>
                    <button>View</button>
                </Link> */}
{/* 
                <button type="button" onClick={() => handleDeleteExercise(exercise.id)}>Delete</button>


                <button type="button"
                    onClick={() => history.push(`/exercise/${exercise.id}/edit`)}>
                    Edit
                </button> */} 

            </div>
        </div>
    );
            }