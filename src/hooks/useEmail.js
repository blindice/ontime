import { useState } from 'react'
import jwt from 'jwt-decode'

export default function useEmail(token) {
  const getEmail = () => {
    if (token) {
      const { email } = jwt(token)
      return email
    }
  }

  const getRole = (token) => {
    if (token) {
      const { email } = jwt(token)
      return String(email).includes('@admin')
    }
    return false
  }

  const [email, setEmail] = useState(getEmail())
  const [isAdmin, setIsAdmin] = useState(getRole())

  const saveEmail = () => {
    const { email } = jwt(token)
    setEmail(email)
  }
  const saveRole = (email) => {
    const result = String(email).includes('@admin')
    setIsAdmin(result)
  }

  return { email, saveEmail, isAdmin, saveRole }
}
