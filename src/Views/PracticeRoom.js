import React, { useEffect, useState } from "react";

//components 
import {ExerciseList} from "../components/exercises/ExerciseList";
import { getExerciseById } from "../components/modules/ExerciseManager";
import {SessionContainer} from "../components/sessions/SessionContainer"

//Returns three columns of exercises organized by category. These are user specific exercises
export const PracticeRoom = () => {
    const [exercises, setExercises] = useState([])

    const handleAddToSession = (id) => {
        let exerciseArray = [];
            getExerciseById(id)
            .then(response => exerciseArray.push(response))
            setExercises(exerciseArray)
    }
   
    return (
        <>
        <div className="headTitle">
        <h1>Your Practice Room</h1>
        </div>

        <div className="melody_col">
        <h2>Melody</h2>
        <ExerciseList
        catId={1}
        handleAddToSession={handleAddToSession} />
        </div>

        <div className="harmony_col">
        <h2>Harmony</h2>
        <ExerciseList 
        catId={2}
        handleAddToSession={handleAddToSession} />
        </div>

        <div className="rhythm_col">
        <h2>Rhythm</h2>
        <ExerciseList
        catId={3}
        handleAddToSession={handleAddToSession}  />
        </div>

        <SessionContainer
        exercises={exercises} />
        </>
    )
}