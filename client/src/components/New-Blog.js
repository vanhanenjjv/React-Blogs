import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import notificationReducer from '../reducers/notification'
import blogsReducer from '../reducers/blogs'
import './App.css'

export const NewBlog = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [isCreating, setIsCreating] = useState(false)
  const [didTryCreate, setDidTryCreate] = useState(false)

  const [newBlog, setNewBlog] = useState({})

  const create = async blog => {
    setDidTryCreate(true)
    const { title, author } = blog;
    try {
      dispatch(blogsReducer.create(blog))
      dispatch(notificationReducer.show({ message: `A new blog '${title}' by ${author} added.`, style: 'success' }))
      setIsCreating(false)
      setDidTryCreate(false)
    } catch (error) {
      dispatch(notificationReducer.show({ message: `${error.response.data.message}`, style: 'error' }))
    }
  }

  if (!user) return null
  if (!isCreating)
    return (
      <button id="new-blog-button" className="btn btn-outline-primary btn-block mb-3" type="button" onClick={() => setIsCreating(true)}>New blog</button>
    )

  return (
    <div className="card mb-3">

      <div className="card-header">
        <h2>New blog</h2>
      </div>

      <div className="card-body">

        <form className={`needs-validation ${didTryCreate ? 'was-validated' : ''}`}>
          <div className="form-group">
            <label htmlFor="title-input">Title</label>
            <input className="form-control" id="title-input" onChange={e => setNewBlog({ ...newBlog, title: e.target.value })} required placeholder="GUI Architectures" />
          </div>

          <div className="form-group">
            <label htmlFor="author-input">Author</label>
            <input className="form-control" id="author-input" onChange={e => setNewBlog({ ...newBlog, author: e.target.value })} required placeholder="Martin Fowler" />
          </div>

          <div className="form-group">
            <label htmlFor="url-input">Url</label>
            <input className="form-control" id="url-input" onChange={e => setNewBlog({ ...newBlog, url: e.target.value })} required placeholder="https://martinfowler.com/eaaDev/uiArchs.html" />
          </div>

        </form>
      </div>

      <div className="card-footer">
        <button className="btn-outline-primary btn btn-block" id="add-blog-button" type="button" onClick={() => create(newBlog)}>Add</button>
        <button className="btn-outline-secondary btn btn-block" type="button" onClick={() => setIsCreating(false)}>Cancel</button>
      </div>

    </div>

  )
}