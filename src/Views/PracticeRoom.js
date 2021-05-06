import React, { useEffect, useState } from "react";

//components 
import { ExerciseList } from "../components/exercises/ExerciseList";
import { getExerciseById } from "../components/modules/ExerciseManager";
import { getAllCategories } from "../components/modules/CategoryManager"
import { SessionContainer } from "../components/sessions/SessionContainer"
import "./PracticeRoom.css"

//Returns three columns of exercises organized by category. These are user specific exercises
export const PracticeRoom = ({ handleBeginButton }) => {
    const [exercises, setExercises] = useState([])
    const [categories, setCategories] = useState([])

    const handleAddToSession = (id) => {
        let exerciseArray = [...exercises];
        getExerciseById(id)
            .then(response => {
                exerciseArray.push(response)
                setExercises(exerciseArray)
            })
    }

    const clearSessionContainer = () => {

        const clearExercises = []
        setExercises(clearExercises)
    }

    useEffect(() => {
        getAllCategories()
            .then(response => {
                setCategories(response)
            })
    }, [])

    return (
        <>
            <body>
                <section className="hero is-small ">
                    <div className="hero-body">
                        <p className="title">Your Practice Room</p>
                    </div>
                </section>

                <section className="exercise_categories_container">
                    {categories.map(category => {
                        return (
                            <div key={category.id} className={category.name}>
                                <h2 className="subtitle is-2">{category.name}</h2>
                                <ExerciseList
                                    catId={category.id}
                                    handleAddToSession={handleAddToSession} />
                            </div>
                        )
                    })}

                </section>

                <SessionContainer
                    exercises={exercises}
                    clearSessionContainer={clearSessionContainer}
                    handleBeginButton={handleBeginButton} />

            </body>
        </>
    )
}