import React, { useRef } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import { NavLink } from 'react-router-dom'
import { Box } from '@mui/system'
import { AwesomeButtonProgress } from 'react-awesome-button'
import { storage } from '../app/db'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

import 'react-awesome-button/dist/styles.css'
import Logout from '../features/account/logout/Logout'

export default function Header() {
  const inputRef = useRef(null)
  const handleUpload = async () => {}
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
                <NavLink to="dashboard">DashBoard</NavLink>
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography variant="subtitle2" textAlign="center">
                <NavLink to="files">Files</NavLink>
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography variant="subtitle2" textAlign="center">
                <NavLink to="upload">Upload</NavLink>
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography variant="subtitle2" textAlign="center">
                Trash
              </Typography>
            </MenuItem>
          </Box>
          {/* <Box sx={{ flexGrow: 1 }}>
            <AwesomeButtonProgress
              type="primary"
              onPress={(event, next) => {
                // do a sync/async task then call `release()`
                inputRef.current.click()
                next()
              }}
            >
              Upload
            </AwesomeButtonProgress>
            <input
              style={{ display: 'none' }}
              ref={inputRef}
              type="file"
              onChange={(event) => {
                const fileObj = event.target.files && event.target.files[0]
                if (!fileObj) {
                  return
                }

                console.log('fileObj is', fileObj)
              }}
            />
          </Box> */}
          <div>
            <Logout />
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}
