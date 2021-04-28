import React from "react";

//components 
import {ExerciseList} from "../components/exercises/ExerciseList";
import {SessionContainer} from "../components/sessions/SessionContainer"

//Returns three columns of exercises organized by category. These are user specific exercises
export const PracticeRoom = () => {

    return (
        <>
        <div className="headTitle">
        <h1>Your Practice Room</h1>
        </div>

        <div className="melody_col">
        <h2>Melody</h2>
        <ExerciseList
        catId={1} />
        </div>

        <div className="harmony_col">
        <h2>Harmony</h2>
        <ExerciseList 
        catId={2}/>
        </div>

        <div className="rhythm_col">
        <h2>Rhythm</h2>
        <ExerciseList
        catId={3} />
        </div>

        <SessionContainer />
        </>
    )
}