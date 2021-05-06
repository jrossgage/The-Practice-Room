import React from "react"
import { Link } from "react-router-dom"
import logo from "../../images/The-Practice-Room-Logo.png"



export const NavBar = (props) => {
  return (
    
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">

      <div className="navbar-brand">
        <div className="navbar-item">
         <img src={logo} alt="Logo"/>
        </div>
      </div>

      <div className="navbar-menu">

        <div className="navbar-start">
            <Link to="/sessions" className="navbar-item is-size-5 is-italic">Sessions</Link>

            <Link to="/room" className="navbar-item is-size-5 is-italic">Practice Room</Link>
        </div>

        <div className="navbar-end">
            <Link to="/exercise/create" className="navbar-item is-size-5 is-italic">New Exercise</Link>
        </div> 

      </div>

    </nav>
  )
}