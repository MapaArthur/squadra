import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";
import { NoLayout } from "./layouts";

// Route Views
import Errors from "./views/Errors";
import Login from "./views/Login";
import RegisterSystem from "./views/RegisterSystem";
import GetSystem from "./views/GetSystem";
import EditSystem from "./views/EditSystem";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/blog-overview" />
  },
  {
    path: "/login",
    exact: true,
    layout: NoLayout,
    component: Login
  },
  {
    path: "/errors",
    exact: true,
    layout: NoLayout,
    component: Errors
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path:"/register-system",
    layout: DefaultLayout,
    component: RegisterSystem
  },
  {
    path:"/get-system",
    layout: DefaultLayout,
    component: GetSystem
  },
  {
    path:"/edit-system/:id",
    exact:true,
    layout: DefaultLayout,
    component: EditSystem
  }
];
