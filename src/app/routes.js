import * as React from 'react'
import { useRoutes } from 'react-router-dom'

import DashBoard from '../pages/DashBoard'
import Files from '../pages/Files'
import LoginPage from '../pages/LoginPage'
import MainPage from '../pages/MainPage'
import Upload from '../pages/Upload'
import Trash from '../pages/Trash'

export default function Routes() {
  let element = useRoutes([
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      element: <MainPage />,
      children: [
        {
          path: '/dashboard',
          element: <DashBoard />,
        },
        {
          path: '/files',
          element: <Files />,
        },
        {
          path: '/upload',
          element: <Upload />,
        },
        {
          path: '/trash',
          element: <Trash />,
        },
      ],
    },
  ])

  return element
}
