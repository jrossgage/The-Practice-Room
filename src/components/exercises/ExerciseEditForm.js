import React, { useState, useEffect } from "react";
import { updateExercise, getExerciseById } from "../modules/ExerciseManager";
import { useParams, useHistory } from "react-router-dom";
//components
import { getAllCategories } from "../modules/CategoryManager"

export const ExerciseEditForm = () => {

    const currentUser= parseInt(sessionStorage.getItem("app_user_id"))
    
    const [exercise, setExercise] = useState({
        userId: currentUser,
        name: "",
        description: "",
        categoryId: 0
    });
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([])

    const { exerciseId } = useParams();
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

    const updateExistingExercise = evt => {
        evt.preventDefault()
        setIsLoading(true);
    
        // This is an edit, so we need the id
        const editedExercise = {
            userId: currentUser,
          id: exerciseId,
          name: exercise.name,
          description: exercise.description,
          categoryId: exercise.categoryId
        };

        updateExercise(editedExercise)
        .then(() => history.push("/room")
        )
    }

    useEffect(() => {
        getExerciseById(exerciseId)
          .then(exercise => {
            setExercise(exercise);
            setIsLoading(false);
          });
      }, []);

      useEffect(() => {
        getAllCategories()
          .then(response => {
            setCategories(response)
          })
      }, [])

      return (
          <>
           <div>
                <h2 className="exerciseForm__title">What do you want to Change?</h2>
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
                    onClick={updateExistingExercise}>
                    Save
              </button>
            </form>
          </>
      )
}