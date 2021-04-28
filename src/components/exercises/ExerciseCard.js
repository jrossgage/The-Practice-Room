import React from "react";
import { Link, useHistory } from "react-router-dom";

export const ExerciseCard = ({ exercise, handleDeleteExercise }) => {

    const history = useHistory()
    return (
        <div className="card">
            <div className="card-content">
                <h3>Name:
                    <span className="card-exerciseName">
                    {exercise.name}
                </span></h3>
                <p>Date: </p>

                {/* <button>Add to Session</button> */}
                
                {/* <Link to={`/exercise/${exercise.id}`}>
                    <button>View</button>
                </Link> */}

                {/* <button type="button" onClick={() => handleDeleteExercise(exercise.id)}>Delete</button> */}


                {/* <button type="button"
                    onClick={() => history.push(`/exercise/${exercise.id}/edit`)}>
                    Edit
                </button> */}

            </div>
        </div>
    );
}