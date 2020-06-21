import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// import Notfound from "@/components/Notfound/index";
import Client from "./client/client";
import MySnackbar from "@/components/Snackbar/index";

import { getToken } from "@/utils/auth";
import LoadingComponent from "@/components/LoadingComponent";

const Admin = lazy(() => import("./admin/admin"));
const Login = lazy(() => import("@/views/login/Login"));


// 登录验证
function requireAuth(Layout, props) {
  if (getToken()) {
    return <Layout {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
}

export default function AppIndex() {
  return (
    <>
      <Suspense fallback={<LoadingComponent />}>
        <Router>
          <>
            <Switch>
              {/* <Route path="/404" component={Notfound} /> */}
              <Route
                path="/admin"
                component={(props) => requireAuth(Admin, props)}
              />

              <Route path={"/login"} component={Login} />
              <Route component={Client} />
            </Switch>
          </>
        </Router>
      </Suspense>
      <MySnackbar />
    </>
  );
}
