import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { useSelector, useDispatch } from 'react-redux'
import Menu from '@mui/material/Menu'
import IconButton from '@mui/material/IconButton'
import AccountCircle from '@mui/icons-material/AccountCircle'

import useEmail from '../../../hooks/useEmail'
import { logoutAsync } from '../accountSlice'

export default function Logout() {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.account)
  const { email } = useEmail(token)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => await dispatch(logoutAsync()).unwrap()
  return (
    <div style={{ float: 'right' }}>
      <Typography
        variant="caption"
        component="span"
        sx={{ fontFamily: 'Nunito', fontWeight: 'bold' }}
      >
        {email}
      </Typography>
      <IconButton
        sx={{ fontSize: 50 }}
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="primary"
        onClick={handleMenu}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Sign-out</MenuItem>
      </Menu>
    </div>
  )
}
