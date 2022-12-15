import React, { useState } from 'react'
import { AwesomeButton } from 'react-awesome-button'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import './HomePage.css'

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <>
      <div className="learn-more">
        <p className="cloud-title">Cloud Computing</p>
        <p className="cloud-description" align="justify">
          Cloud computing permits customers to store their data in a remote
          location. However, data security is the most significant risk in cloud
          computing. Due to this, many businesses are hesitant to use cloud
          environments. To combat this, a CSP's Service-Level Agreement (SLA)
          with its customers should include provisions for 14 confidentiality,
          integrity, and availability. If not, verify that important information
          is not stored in a public cloud, and if it is, that it is encrypted.
          Effective auditing procedures may also be utilized to ensure data
          integrity.
        </p>
        <Button variant="contained" onClick={() => navigate('/info')}>
          Learn More
        </Button>
      </div>
      <div className="cloud-logo">
        <img
          alt="logo"
          src="/images/cloud-logo.png"
          className="logo-image"
        ></img>
      </div>
    </>
  )
}
