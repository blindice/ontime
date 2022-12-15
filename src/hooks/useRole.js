import { useState } from 'react'
import jwt from 'jwt-decode'

export default function useRole() {
  const getInitialRole = () => {
    const token = localStorage.getItem('token')

    if (!token) return false

    console.log(token)
    const { email } = jwt(token)
    console.log(email)
    const isAdmin = String(email).includes('@admin')
    console.log(isAdmin)
    return isAdmin
  }

  const [isAdmin, setIsAdmin] = useState(getInitialRole())

  const saveIsAdmin = () => {
    const token = localStorage.getItem('token')

    if (!token) return false

    console.log(token)
    const { email } = jwt(token)
    console.log(email)
    const isAdmin = String(email).includes('@admin')
    console.log(isAdmin)
    setIsAdmin(isAdmin)
  }

  return { isAdmin, saveIsAdmin }
}
