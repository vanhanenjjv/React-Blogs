import React, { } from 'react'
import { useSelector } from 'react-redux'
import './App.css'


export const Notification = () => {

  const notification = useSelector((state: any) => state.notification)

  if (!notification) return null;
  const { style, message } = notification

  return (
    <div className={`notification-${style} notification`}>
      <span>{message}</span>
    </div>
  )
}