import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

//components and functions
import { ExerciseCard } from "./ExerciseCard";
import { getAllExercises, getExercisesByCatId, deleteExercise } from "../modules/ExerciseManager";


export const ExerciseList = ({ catId }) => {
    const [exercises, setExercises] = useState([])
    const history = useHistory() 

    const userId = sessionStorage.getItem("app_user_id")

    const getCatExercises = (cat, user) => {
        return getExercisesByCatId(cat, user).then(catExercises => {
            setExercises(catExercises)
        })
    }

    // const handleDeleteExercise = (id) => {
    //     deleteExercise(id)
    //     .then(() => getFilteredExercises(catId));
    // };

    useEffect(() => {
        getCatExercises(catId, userId);
    }, []);

    return (
        <>
            <div className="container-cards">
                {exercises.map(exercise =>
                    <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                        /*handleDeleteExercise={handleDeleteExercise}*/ />)}
            </div>
        </>
    )
}