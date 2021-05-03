import React, { useState } from "react"
import { Route, Router, useHistory } from "react-router-dom"

//Components 
import { LandingPage } from "./views/LandingPage";
import { ExerciseForm } from "./components/exercises/ExerciseForm";
import { ExerciseEditForm } from "./components/exercises/ExerciseEditForm";
import { PracticeRoom } from "./views/PracticeRoom";
import { Session } from "./views/Session";
import { PracticeView } from "./views/PracticeView";
import {ExerciseDetail} from "./components/exercises/ExerciseDetail";
import {NoteEditForm} from "./components/notes/NoteEditForm";

export const ApplicationViews = () => {

  const [sessionId, setSessionId] = useState();
  const history = useHistory()
  //Traveling down to the SessionCard child
  //need to pass sessionId as state into PracticeView
  const handleBeginButton = (sessionId) => {
    setSessionId(sessionId)
    history.push("/practice")
  }

  return (
    <>

      <Route exact path="/">
        <LandingPage />
      </Route>

      <Route exact path="/exercise/create">
        <ExerciseForm />
      </Route>

      <Route path="/exercise/:exerciseId(\d+)/edit">
        <ExerciseEditForm />
      </Route>

      <Route exact path="/exercise/:exerciseId(\d+)">
        <ExerciseDetail />
      </Route>

      <Route path="/note/:noteId(\d+)/edit">
        <NoteEditForm />
      </Route>

      <Route path="/room">
        <PracticeRoom />
      </Route>

      <Route path="/sessions">
        <Session
          handleBeginButton={handleBeginButton} />
      </Route>

      <Route path="/practice">
        <PracticeView
          sessionId={sessionId} />
      </Route>

    </>
  )
}
