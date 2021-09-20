import React, { } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import notificationReducer from '../reducers/notification'
import userReducer from '../reducers/user'
import { LOGOS } from '../constants'
import './App.css'

import {
  NavLink,
  useHistory,
} from "react-router-dom"

export const Navbar = () => {

  const user = useSelector((state: any) => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const logout = () => {
    dispatch(userReducer.logout())
    history.push('/')
    dispatch(notificationReducer.show({ message: `${user.name} logged out.`, style: 'success' }))
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">

      <div className="container">
        <NavLink className="navbar-brand" to="">
          <img className="pr-2" width="32" src={LOGOS.logo192} alt="Logo" />
          <span>React Blogs</span>
        </NavLink>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation-navbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navigation-navbar">
          <ul className="navbar-nav mr-auto">

            <li className="nav-item">
              <NavLink activeClassName="active" className="nav-link" to="/blogs">Blogs</NavLink>
            </li>

            <li className="nav-item">
              <NavLink activeClassName="active" className="nav-link" to="/users">Users</NavLink>
            </li>

          </ul>

          <div className="navbar-nav">
            <li className="nav-item">
              <button className="btn btn-outline-info btn-block" type="button" onClick={() => logout()}>Logout</button>
            </li>
          </div>

        </div>
      </div>

    </nav>
  )
}