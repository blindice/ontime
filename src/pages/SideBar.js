import { Sidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

import useRole from "../hooks/useRole";
import { audit } from "../helper/worker";
import useEmail from "../hooks/useEmail";

export default function SideBar() {
  const { token } = useSelector((state) => state.account);
  const { email } = useEmail(token);
  const { isAdmin } = useRole();

  return (
    <>
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            height: "100vh",
            backgroundColor: "white",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          },
        }}
      >
        <div style={{ marginBottom: "10em", fontFamily: "Work Sans" }}>
          <span>
            <img
              alt="logo"
              src="/images/upbox-icon.png"
              style={{
                height: "6em",
                transform: "translate(4.5em, 1em)",
              }}
            ></img>
            {/* <p
              style={{
                fontSize: '30px',
                transform: 'translate(3.2em,-1.2em)',
              }}
            >
              BoX
            </p> */}
          </span>
        </div>
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              if (level === 0)
                return {
                  color: disabled ? "black" : "#1565c0",
                  backgroundColor: active ? "black" : undefined,
                  fontFamily: "Work Sans",
                  fontWeight: 700,
                  fontSize: "14px",
                  ":hover": {
                    backgroundColor: "#1565c0",
                    color: "white",
                  },
                };
            },
          }}
        >
          <MenuItem
            routerLink={<Link to="/dashboard" />}
            prefix={<DashboardRoundedIcon />}
            onClick={async () => {
              await audit({
                user: email,
                activity: "Viewing",
                description: "Viewed on DashBoard",
                priority: "Low",
                status: "Success",
              });
            }}
          >
            {" "}
            DASHBOARD
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/files" />}
            prefix={<AttachFileRoundedIcon />}
          >
            {" "}
            FILES
          </MenuItem>
          <Box display={!isAdmin && { sm: "none" }}>
            <MenuItem
              routerLink={<Link to="/upload" />}
              prefix={<CloudUploadRoundedIcon />}
            >
              {" "}
              UPLOAD
            </MenuItem>
          </Box>
          <Box display={!isAdmin && { sm: "none" }}>
            <MenuItem
              routerLink={<Link to="/trash" />}
              prefix={<DeleteRoundedIcon />}
              onClick={async () => {
                await audit({
                  user: email,
                  activity: "Viewing",
                  description: "Viewed on Trash",
                  priority: "Low",
                  status: "Success",
                });
              }}
            >
              TRASH
            </MenuItem>
          </Box>
          <Box display={!isAdmin && { sm: "none" }}>
            <MenuItem
              routerLink={<Link to="/audit" />}
              prefix={<BrightnessAutoRoundedIcon />}
            >
              {" "}
              AUDIT TRACE
            </MenuItem>
          </Box>
        </Menu>
      </Sidebar>
    </>
  );
}
