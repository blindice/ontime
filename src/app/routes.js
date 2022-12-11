import * as React from "react";
import { useRoutes } from "react-router-dom";
import DashBoard from "../pages/DashBoard";
import Files from "../pages/Files";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";

export default function Routes() {
  let element = useRoutes([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      element: <MainPage />,
      children: [
        {
          path: "/dashboard",
          element: <DashBoard />,
        },
        {
          path: "/files",
          element: <Files />,
        },
      ],
    },
  ]);

  return element;
}
