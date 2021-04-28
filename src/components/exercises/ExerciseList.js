import React, {useState, useEffect} from "react";
import { useHistory } from "react-router";

//components and functions
import { ExerciseCard } from "./ExerciseCard";
import { getAllExercises, getExercisesByCatId, deleteExercise } from "../modules/ExerciseManager";


export const ExerciseList = () => {
    const [exercises, setExercises] = useState([])
    const history = useHistory() 

    const  getFilteredExercises = (catId) => {
        return getExercisesByCatId(catId).then(exercises => {
            setExercises(exercises)
        });
    };

    const handleDeleteExercise = (id) => {
        deleteExercise(id)
        .then(() => getFilteredExercises(catId));
    };

    useEffect(() => {
        getFilteredExercises(catId);
    }, []);

    return (
        <>
        <h1>ExerciseList Mounted!</h1>
        <div className="container-cards">
                {exercises.map(exercise => <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    handleDeleteExercise={handleDeleteExercise} />)}
            </div>
        </>
    )
}