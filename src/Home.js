import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./components/nav/NavBar"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { userStorageKey } from "./components/auth/authSettings"
import "./Home.css"

export const Home = () => (
  <>
    <Route
      render={() => {
        if (sessionStorage.getItem(userStorageKey)) {
          return (
            <>
              {/* <NavBar /> */}
              <ApplicationViews />
              <footer className="footer">&copy; The Practice Room 2021</footer>
            </>
          )
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
)
