import { useState } from 'react'
import jwt from 'jwt-decode'

export default function useEmail(token) {
  const getEmail = () => {
    if (token) {
      const { email } = jwt(token)
      return email
    }
  }

  const [email, setEmail] = useState(getEmail())

  const saveEmail = () => {
    const { email } = jwt(token)
    setEmail(email)
  }

  return { email, saveEmail }
}
