import React, {  } from 'react'
import { useDispatch } from 'react-redux'
import notificationReducer from '../reducers/notification'
import blogsReducer from '../reducers/blogs'
import './App.css'

import {
  useHistory,
} from "react-router-dom"

export const RemoveBlog = ({ blog }) => {

  const dispatch = useDispatch()
  const history = useHistory()

  const remove = blog => {
    const { title, author } = blog

    if (!window.confirm(`Do you want to remove '${title}' by ${author}?`))
      return

    try {
      dispatch(notificationReducer.show({ message: `Removed blog '${title}' by ${author}.`, style: 'success' }))
      dispatch(blogsReducer.remove(blog))
      history.push('/')
    } catch (error) {
      dispatch(notificationReducer.show({ message: `${error.response.data.message}`, style: 'error' }))
    }
  }

  return <button id="remove-blog-button" className="btn btn-outline-danger btn-block" onClick={() => remove(blog)}>Remove</button>
}