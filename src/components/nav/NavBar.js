import React from "react"
import { Link } from "react-router-dom"

export const NavBar = (props) => {
    return (
      <nav className="navbar bg-dark text-white flex-md-nowrap p-0 shadow">
        <ul className="nav nav-pills nav-fill">
          <li className="nav-item">
          <Link to="/room">Your Practice Room</Link>
          </li>
          <li className="nav-item">
          <Link to="/sessions">Your Sessions</Link>
          </li>
          <li className="nav-item">
          <Link to="/exercise/create">New Exercise</Link>
          </li>
        </ul>
      </nav>
    )
  }