import React, { } from 'react'
import { useSelector } from 'react-redux'
import './App.css'

import {
  Link,
  useParams,
} from "react-router-dom"

type UserParams = {
  id: string;
}

export const User = () => {

  const id = useParams<UserParams>().id
  const users = useSelector((state: any) => state.users)

  if (!users) return null
  const user = users.find(u => u.id === id)

  return (
    <>
      <div className="card mb-1">
        <div className="card-header">
          <h3>{user.name}</h3>
        </div>
      </div>

      <div className="card ml-3">

        <div className="card-header">
          <span className="font-weight-bold">Blogs:</span>
        </div>

        <div className="list-group list-group-flush">
          {!user.blogs.length && <p className="list-group-item">User hasn't added any blogs yet!</p>}
          {user.blogs && user.blogs.map(blog =>
            <Link className="list-group-item" to={`/blogs/${blog.id}`} key={blog.id}>{blog.title}</Link>
          )}
        </div>
      </div>
    </>
  )
}