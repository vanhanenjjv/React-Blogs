import React, { useState } from 'react'
import authService from '../services/auth'
import { useSelector, useDispatch } from 'react-redux'
import notificationReducer from '../reducers/notification'
import userReducer from '../reducers/user'
import { LOGOS } from '../constants'
import './App.css'

export const Login = () => {

  const user = useSelector((state: any) => state.user)
  const dispatch = useDispatch()

  const [didTryLogin, setDidTryLogin] = useState(false)
  const [credentials, setCredentials] = useState({})

  if (user) return null;

  const login = async credentials => {
    try {
      setDidTryLogin(true)
      const user = await authService.login(credentials)
      dispatch(userReducer.login(user))
      dispatch(notificationReducer.show({ message: `${user.name} logged in.`, style: 'success' }))
    } catch (error) {
      dispatch(notificationReducer.show({ message: `${error.response.data.message}`, style: 'error' }))
    }
  }

  const bypass = async () => {
    login({ username: 'dummy', password: 'salasana' })
  }

  return (
    <>
      <form onSubmit={e => { e.preventDefault(); login(credentials) }} className={`form-signin needs-validation ${didTryLogin ? 'was-validated' : ''}`} id="login-form" noValidate>

        <img className="img-fluid" src={LOGOS.logo512} alt="Logo"></img>

        <div className="form-group">
          <h2>React Blogs</h2>
        </div>

        <div className="form-group">
          <input className="form-control"
            id="username-input"
            onChange={e => setCredentials({ ...credentials, username: e.target.value })}
            placeholder="Username"
            type="text"
            required
            autoFocus />
          <div className="invalid-feedback">
            Please enter a username.
          </div>
        </div>

        <div className="form-group">
          <input className="form-control"
            id="password-input"
            onChange={e => setCredentials({ ...credentials, password: e.target.value })}
            type="password"
            placeholder="Password"
            required />
          <div className="invalid-feedback">
            Please enter a password.
          </div>
        </div>

        <div className="form-group">
          <button className="btn btn-outline-primary btn-block btn-lg" id="login-button" type="submit">Login</button>
        </div>
        <p className="text-muted small"> ...or login as <span className="btn-link" onClick={bypass}>Dummy</span>.</p>
      </form>

    </>
  )
}