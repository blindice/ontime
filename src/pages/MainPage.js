import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import withHeaderAndFooter from '../components/withHeaderAndFooter'

function MainPage() {
  const { token } = useSelector((state) => state.account)

  return (
    <div className="container" style={{ height: '87vh', width: '100vw' }}>
      {token ? <Outlet /> : <Navigate replace to="/" />}
    </div>
  )
}

export default withHeaderAndFooter(MainPage)
