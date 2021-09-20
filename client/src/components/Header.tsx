
import React, { } from 'react'
import { useSelector } from 'react-redux'
import './App.css'


export const Header = () => {

  const user = useSelector((state: any) => state.user)

  if (!user) return null;

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">Welcome <b>{user.name}</b>!</h1>

      </div>
    </div>
  )
}