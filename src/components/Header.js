import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { NavLink } from 'react-router-dom'

import Logout from '../features/account/logout/Logout'
import { Box } from '@mui/system'

export default function Header() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/main"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            UpBox
          </Typography>
          <Box style={{ display: 'flex' }} sx={{ flexGrow: 1 }}>
            <MenuItem>
              <Typography variant="subtitle2" textAlign="center">
                <NavLink to="dashboard">Home</NavLink>
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography variant="subtitle2" textAlign="center">
                User
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography variant="subtitle2" textAlign="center">
                Etc
              </Typography>
            </MenuItem>
          </Box>
          <div>
            <Logout />
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}
