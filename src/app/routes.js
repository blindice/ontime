import * as React from 'react'
import { useRoutes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'

export default function Routes() {
  let element = useRoutes([
    {
      path: '/',
      element: <LoginPage />,
    },
  ])

  return element
}
