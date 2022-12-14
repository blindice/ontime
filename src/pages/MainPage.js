import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import withHeaderAndFooter from '../components/withHeaderAndFooter'

function MainPage() {
  const { token, isLoggedIn } = useSelector((state) => state.account)

  useEffect(() => {})

  return (
    <div className="container" style={{ height: '87vh', width: '78vw' }}>
      {token && isLoggedIn ? <Outlet /> : <Navigate replace to="/" />}
    </div>
  )
}

export default withHeaderAndFooter(MainPage)
