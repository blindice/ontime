import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function MainPage() {
  const { name, token } = useSelector((state) => state.account)

  return <>{token ? <span>{name}</span> : <Navigate replace to="/" />}</>
}
