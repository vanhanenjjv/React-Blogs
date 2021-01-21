import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import notificationReducer from '../reducers/notification'
import blogsReducer from '../reducers/blogs'
import './App.css'
import { RemoveBlog } from './Remove-Blog'

import {
  useParams,
} from "react-router-dom"

export const Blog = () => {

  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const commentInput = useRef(null)
  if (!blogs) return null
  const blog = blogs.find(blog => blog.id === id)
  if (!blog) return null

  const { title, author, url, likes } = blog

  const like = blog => {
    dispatch(blogsReducer.like(blog))
    dispatch(notificationReducer.show({ message: `Liked blog '${title}' by ${author}.`, style: 'success' }))
  }

  const canRemove = (blog, user) => {
    if (!user) return false
    if (user.username !== blog.user?.username) return false
    return true
  }

  const comment = async comment => {
    try {
      dispatch(blogsReducer.comment(blog, comment))
      commentInput.current.value = ''
    } catch (error) {
      dispatch(notificationReducer.show({ message: `${error.response.data.message}`, style: 'error' }))
    }
  }

  return (
    <>
      <div className="card mb-3">
        <div className="card-header">
          <h4>Blog <span className="text-muted">{`<${blog.id}>`}</span></h4>
        </div>

        <div className="card-body p-0">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <small className="text-muted">Title</small>
              <p className="">{title}</p>
            </li>
            <li className="list-group-item">
              <small className="text-muted">Author</small>
              <p>{author}</p>
            </li>
            <li className="list-group-item">
              <small className="text-muted">Source</small>
              <p><span href={url}>{url}</span></p>
            </li>
            <li className="list-group-item">
              <small className="text-muted">Likes</small>
              <p><span title="Likes" className="badge bg-success badge-pill text-white likes-badge">{likes}</span></p>
            </li>
          </ul>
        </div>

        <div className="card-footer">
          <button id="like-blog-button" className="btn btn-outline-success btn-block" onClick={() => like(blog)}>Like</button>
          {canRemove(blog, user) &&
            <RemoveBlog blog={blog}></RemoveBlog>}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h4>Comments</h4>
        </div>
        <div className="card-body">
          {blog.comments && blog.comments.map((comment, i) => <li key={i}>{comment}</li>)}
          {!blog.comments.length &&
            <p className="text-muted">This blog hasn't been commented yet.</p>
          }
        </div>
        <div className="card-footer">
          <form onSubmit={e => { e.preventDefault(); comment(commentInput.current.value) }} className="d-flex">
            <input id="comment-input" ref={commentInput} className="form-control mr-1" type="search" placeholder="Leave a comment." required />
            <button id="submit-comment-button" className="btn btn-outline-secondary" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  )

}