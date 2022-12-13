import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded'
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'

export default function SideBar() {
  return (
    <>
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            height: '100vh',
            backgroundColor: 'white',
            boxShadow: '0 0 6px hsl(210 14% 90%)',
          },
        }}
      >
        <div style={{ marginBottom: '10em', fontFamily: 'Work Sans' }}>
          <p style={{ fontSize: '24px', fontWeight: 300 }}>
            <span>
              <img
                alt="logo"
                src="/images/upbox-icon.png"
                style={{
                  height: '7vh',
                  marginLeft: '3em',
                  transform: 'translate(4px, 7px)',
                }}
              ></img>
            </span>
            BoX
          </p>
        </div>
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled, hover }) => {
              if (level === 0)
                return {
                  color: disabled ? 'black' : 'black',
                  backgroundColor: active ? 'black' : undefined,
                  fontFamily: 'Work Sans',
                  fontSize: '14px',
                  ':hover': {
                    backgroundColor: 'grey',
                  },
                }
            },
          }}
        >
          <MenuItem
            routerLink={<Link to="/dashboard" />}
            prefix={<DashboardRoundedIcon />}
          >
            {' '}
            DASHBOARD
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/files" />}
            prefix={<AttachFileRoundedIcon />}
          >
            {' '}
            FILES
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/upload" />}
            prefix={<CloudUploadRoundedIcon />}
          >
            {' '}
            UPLOAD
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/trash" />}
            prefix={<DeleteRoundedIcon />}
          >
            TRASH
          </MenuItem>
        </Menu>
      </Sidebar>
    </>
  )
}
