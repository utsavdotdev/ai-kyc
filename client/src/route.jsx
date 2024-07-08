import React from "react";
import { useRoutes } from "react-router-dom";
import Nav from "./layouts/Nav";
import NavFoot from "./layouts/NavFoot";
import {
  Hero,
  Dashboard,
  Setting,
  UserForm,
  AllUser,
  Analytics,
  FillForm
} from "./pages";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <NavFoot />,
      children: [{ path: "", element: <Hero /> }],
    },

    {
      path: "/",
      element: <Nav />,
      children: [
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/form/:id", element: <AllUser /> },
        { path: "/setting", element: <Setting /> },
        { path: "/analytics", element: <Analytics /> },
        { path: "/fillform", element: <FillForm /> },
      ],
    },
    {
      path: "/userform/:id",
      element: <UserForm />,
    },
  ]);
}
