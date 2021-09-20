import React, { } from 'react'
import { useSelector } from 'react-redux'
import './App.css'

import {
  Link,
} from "react-router-dom"

export const Users = () => {
  const users = useSelector((state: any) => state.users)

  if (!users)
    return <p>No users to display!</p>

  return (

    <div className="card">

      <div className="card-header">
        <h2>Users</h2>
      </div>

      <table className="table table-hover mb-0">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Blogs created</th>
          </tr>
        </thead>
        <tbody className="table-hover">
          {
            users.map(user =>
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`} > {user.name}</Link>
                </td>
                <td>
                  {user.blogs.length}
                </td>
              </tr>
            )
          }
        </tbody>
      </table>

    </div>

  )

}