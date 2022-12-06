import * as React from 'react'
import { useRoutes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import MainPage from '../pages/MainPage'

export default function Routes() {
  let element = useRoutes([
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/main',
      element: <MainPage />,
    },
  ])

  return element
}
