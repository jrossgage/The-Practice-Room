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
            <div>
                <h2 className="exerciseForm__title">What do you want to work on?</h2>
                <button className="goBack-bttn"
                    onClick={handleClickGoBack}>
                  Landing Page
              </button>
            </div>
            <form className="exerciseForm">
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select value={exercise.categoryId} name="categoryId" id="categoryId" onChange={handleControlledInputChange} className="form-control" >
                            <option value="0">Category</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Exercise Name:</label>
                        <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="exercise name" value={exercise.name} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea type="textfield" id="description" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="exercise description" value={exercise.description} />
                    </div>
                </fieldset>

                <button disabled={isLoading} className="saveExercise-bttn"
                    onClick={handleClickSaveExercise}>
                    Save
              </button>
            </form>
        </>
    )
}


