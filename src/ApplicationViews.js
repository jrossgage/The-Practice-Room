import React from "react"
import { Route, Router } from "react-router-dom"

//Components 
import { LandingPage } from "./views/LandingPage";
import { ExerciseForm } from "./components/exercises/ExerciseForm";
import { PracticeRoom } from "./views/PracticeRoom";
import { Session } from "./views/Session";
import { PracticeView } from "./views/PracticeView";

export const ApplicationViews = () => {
    return (
      <>
  
        <Route exact path="/">
          <LandingPage />
        </Route>

        <Route path="/exercise/create">
          <ExerciseForm />
        </Route>

        <Route path="/room">
            <PracticeRoom />
        </Route>
        
        <Route path= "/sessions">
            <Session />
        </Route>

        <Route path= "/practice">
            <PracticeView />
        </Route>
        
        </>
    )
  }
  