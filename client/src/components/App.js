import React, { useEffect } from 'react'
import authService from '../services/auth'
import { useSelector, useDispatch } from 'react-redux'
import blogsReducer from '../reducers/blogs'
import userReducer from '../reducers/user'
import usersReducer from '../reducers/users'
import { PUBLIC_URL } from '../constants'
import './App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import { Navbar } from './Navbar'
import { Header } from './Header'
import { Login } from './Login'
import { User } from './User'
import { Users } from './Users'
import { Blogs } from './Blogs'
import { Blog } from './Blog'
import { NewBlog } from './New-Blog'
import { Notification } from './Notification'

export const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(blogsReducer.initialize())
    dispatch(usersReducer.initialize())
    const user = authService.getUser()
    if (user)
      dispatch(userReducer.login(user))
  }, [dispatch])

  const user = useSelector(state => state.user)

  if (!user) return (
    <>
      <Notification></Notification>
      <Login></Login>
    </>
  )

  return (

    <Router basename={PUBLIC_URL}>

      <Navbar></Navbar>
      <Header></Header>

      <div className="container">
        <Notification></Notification>
        <Switch>

          <Route path="/blogs/:id">
            <Blog></Blog>
          </Route>

          <Route path="/users/:id">
            <User></User>
          </Route>

          <Route path="/users">
            <Users></Users>
          </Route>

          <Route path="/">
            <NewBlog></NewBlog>
            <Blogs></Blogs>
          </Route>

        </Switch>
      </div>

    </Router>

  )

}



