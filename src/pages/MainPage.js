import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import withTemplate from '../components/withTemplate'

function MainPage() {
  const { token } = useSelector((state) => state.account)

  useEffect(() => {
    document.body.classList.add('main-page')

    return () => document.body.classList.remove('main-page')
  }, [])

  return (
    <div
      className="container"
      style={{ height: '92vh', width: '78vw', backgroundColor: 'white' }}
    >
      {token ? <Outlet /> : <Navigate replace to="/" />}
    </div>
  )
}

export default withTemplate(MainPage)
