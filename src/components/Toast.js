import React from 'react'
import { ToastContainer, Slide } from 'react-toastify'

export default function Toast() {
  return (
    <ToastContainer
      transition={Slide}
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  )
}
