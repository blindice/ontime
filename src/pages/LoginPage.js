import React from 'react'
import { Login } from '@features/account'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function LoginPage() {
  const token = useSelector((state) => state.account.token)
  return <>{!token ? <Login /> : <Navigate replace to="/main" />}</>
}
