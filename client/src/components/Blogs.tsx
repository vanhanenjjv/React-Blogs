import React, {  } from 'react'
import { useSelector } from 'react-redux'
import './App.css'

import {
  Link,
} from "react-router-dom"

export const Blogs = () => {

  const blogs = useSelector((state: any) => state.blogs)

  if (!blogs?.length) return <p>No blogs to display!</p>
  return (
    <div className="card">
      <div className="card-header">
        <h2>Blogs</h2>
      </div>
      <div className="list-group-flush">
        {blogs.sort((b, span) => span.likes - b.likes).map(blog =>
          <span className="list-group-item d-flex justify-content-between align-items-center" key={blog.id}>
            <span><Link className="blog-link" to={`/blogs/${blog.id}`}>{blog.title} </Link> - {blog.author}</span>
            <span title="Likes" className="badge bg-success badge-pill text-white likes-badge">{blog.likes}</span>
          </span>
        )}
      </div>
    </div>
  )
}