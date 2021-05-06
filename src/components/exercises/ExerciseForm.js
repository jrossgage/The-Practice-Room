import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { addExercise } from "../modules/ExerciseManager";
import { getAllCategories } from "../modules/CategoryManager";

export const ExerciseForm = () => {

    const currentUser = parseInt(sessionStorage.getItem("app_user_id"))

    const [exercise, setExercise] = useState({
        userId: currentUser,
        name: "",
        description: "",
        categoryId: 0
    });

    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const handleControlledInputChange = (event) => {

        const newExercise = { ...exercise }
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newExercise[event.target.id] = selectedVal
        setExercise(newExercise)
    }

    const handleClickSaveExercise = (event) => {
        event.preventDefault()
        setIsLoading(true)

        const name = exercise.name
        const description = exercise.description
        const categoryId = exercise.categoryId

        if (name === "" || description === "" || categoryId === 0) {
            window.alert("Please input more information")
        } else {
            addExercise(exercise)
                .then(() => history.push("/room"))
        }
    }

    const handleClickGoBack = (event) => {
        history.push("/")
    }


    useEffect(() => {
        getAllCategories()
            .then(response => {
                setCategories(response)
            })
    }, [])

    return (
        <>
            <div className="hero is-small is-primary">
                <h2 className="hero-body">
                    <p className="title">What do you want to work on?</p>
                    </h2>
            </div>

            
                <fieldset className="field">
                    <div className="dropdown">
                        <div className="dropdown-trigger ">
                            <select value={exercise.categoryId} name="categoryId" id="categoryId" onChange={handleControlledInputChange} className="dropdown-item" >
                                <option value="0">Category</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                </fieldset>
                <fieldset className="field">
                    <label className="label is-medium">Exercise Name:</label>
                    <div className="control">
                        <input type="text" id="name" onChange={handleControlledInputChange} className="input" placeholder="exercise name" value={exercise.name} />
                    </div>
                </fieldset>
                <fieldset className="field">
                    <label className="label is-medium">Description:</label>
                    <div className="control">
                        <textarea type="textarea" id="description" onChange={handleControlledInputChange} className="textarea" placeholder="exercise description" value={exercise.description} />
                    </div>

                </fieldset>

                    <button disabled={isLoading} className="button is-primary"
                        onClick={handleClickSaveExercise}>
                        Save
                     </button>

                     <button className="button is-light"
                    onClick={handleClickGoBack}>
                   Cancel
              </button>
          
        </>
    )
}


