import React from 'react'
import Login from '../features/account/login/Login'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function LoginPage() {
  const token = useSelector((state) => state.account.token)
  return (
    <div className="container">
      {!token ? <Login /> : <Navigate replace to="/dashboard" />}
    </div>
  )
}
