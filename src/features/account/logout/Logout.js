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

  const origin = {
    vertical: 'top',
    horizontal: 'right',
  }

  const handleLogout = async () => await dispatch(logoutAsync()).unwrap()
  return (
    <>
      <Typography variant="caption" component="span" sx={{ flexGrow: 1 }}>
        {email}
      </Typography>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={handleMenu}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={origin}
        keepMounted
        transformOrigin={origin}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Sign-out</MenuItem>
      </Menu>
    </>
  )
}
