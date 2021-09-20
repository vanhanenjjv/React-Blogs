import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import notificationReducer from '../reducers/notification'
import blogsReducer from '../reducers/blogs'
import './App.css'
import { RemoveBlog } from './Remove-Blog'

import {
  useParams,
} from "react-router-dom"
import { Blog, BlogParams } from '../types'

export const BlogComponent = () => {

  const id = useParams<BlogParams>().id
  const blogs: Array<Blog> = useSelector((state: any) => state.blogs)
  const user = useSelector((state: any) => state.user)
  const dispatch = useDispatch()
  const commentInput = useRef<HTMLInputElement>(null)
  if (!blogs) return null
  const blog = blogs.find(blog => blog.id === id)
  if (!blog) return null

  const { title, author, url, likes }: Blog = blog

  const like = blog => {
    dispatch(blogsReducer.like(blog))
    dispatch(notificationReducer.show({ message: `Liked blog '${title}' by ${author}.`, style: 'success' }))
  }

  const canRemove = (blog, user): boolean => {
    if (!user)
      return false
    if (user.username !== blog.user?.username)
      return false
    return true
  }

  const comment = async comment => {
    try {
      dispatch(blogsReducer.comment(blog, comment))
      if (commentInput && commentInput.current)
        commentInput.current.value = ''
    } catch (error) {
      // error.respones.data.message
      dispatch(notificationReducer.show({ message: `${error}`, style: 'error' }))
    }
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    if (commentInput && commentInput.current)
      comment(commentInput.current.value)
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
              <p><a href={url}>{url}</a></p>
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
          <form onSubmit={e => { handleFormSubmit(e) }} className="d-flex">
            <input id="comment-input" ref={commentInput} className="form-control mr-1" type="search" placeholder="Leave a comment." required />
            <button id="submit-comment-button" className="btn btn-outline-secondary" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  )

}