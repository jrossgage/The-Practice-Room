import React, {useState, useEffect} from "react";

//components 
import {ExerciseList} from "../components/exercises/ExerciseList";
import {SessionContainer} from "../components/sessions/SessionContainer"

export const PracticeRoom = () => {
    const [exercises, setExercises] = useState({})


    return (
        <>
        <div className="headTitle">
        <h1>Your Practice Room</h1>
        </div>

        <ExerciseList />
        <SessionContainer />
        </>
    )
}