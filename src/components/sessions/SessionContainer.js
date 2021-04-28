import React from "react"

//This component needs to accept exercises that have been selected by the user and display them within the container.
//Once the desired exercises are stored within the container, the user should have the option to save the session to the database.
//I believe the container will really just need the exerciseId and userId as reference to the database
//Idea: Perhaps a button handler function could be created within the practice view that accepts the id of an exercise when "Add to Session" is clicked.
//This id could then be used to get a specific exercise from the database, save it to state within PracticeRoom in an array, and then pass that array to session Container

//1. This component needs an array of exercises
//2. This component exists within Practice Room, thus Practice Room needs to generate an array of exercises.
//3. To generate an array of exercises, Practice Room needs the specific id of the desired exercises and then store it within an array (state).
//4. To get the specific id, a button must be clicked on the exercise card that grabs the exercise id.
//5. State cannot be passed up from children components, therefore, the function handling the button must exist within PracticRoom

//components 
import { SessionExerciseCard } from "../exercises/ExerciseCard"

export const SessionContainer = ({ exercises }) => {



    return (
        <>
            <div className="sessionContainerTitle">
                <input type="text" id="name" /*onChange={handleControlledInputChange}*/ required autoFocus className="form-control" placeholder="Current Practice Session" /*value={exercise.name}*/ />
                 </div>
                <div className="container-cards">
                    {exercises.map(exercise =>
                        <SessionExerciseCard
                            key={exercise.id}
                            exercise={exercise}
                        />)}
                </div>
                <button>Begin Practicing!</button>
                <button>Save For Later</button>
                <button>Clear</button>
           
        </>
    )
}