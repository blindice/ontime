import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'

export default function FrontPage() {
  return (
    <>
      <div
        className="home-menu"
        style={{ position: 'sticky', top: 0, zIndex: 1000 }}
      >
        <NavLink
          exact={true}
          to="/"
          style={{ color: 'white', textDecoration: 'none' }}
        >
          Home
        </NavLink>
        <NavLink to="/about" style={{ color: 'white', textDecoration: 'none' }}>
          About us
        </NavLink>
        <NavLink to="/info" style={{ color: 'white', textDecoration: 'none' }}>
          Info
        </NavLink>
        <NavLink to="/login" style={{ color: 'white', textDecoration: 'none' }}>
          Login
        </NavLink>
      </div>
      <Outlet />
    </>
  )
}
