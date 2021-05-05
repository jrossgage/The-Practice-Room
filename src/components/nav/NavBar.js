import React from "react"
import { Link } from "react-router-dom"
// import "bootstrap/dist/css/bootstrap.min.css"


export const NavBar = (props) => {
  return (
    <div className="block">
      <nav className="nav">
        <div className="nav-left">
          <a className="nav-item">
            <Link to="/room">Your Practice Room</Link>
          </a>
        </div>
        <div className="nav-center">
          <a className="nav-item">
            <Link to="/sessions">Your Sessions</Link>
          </a>
        </div>
        <div className="nav-right">
          <a className="nav-item">
            <Link to="/exercise/create">New Exercise</Link>
          </a>
        </div>
      </nav>
    </div>
  )
}