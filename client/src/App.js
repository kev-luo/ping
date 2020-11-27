import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./components/Nav";
import Dashboard from "./pages/Dashboard";
import Portal from "./pages/Portal";
import UserSettings from "./pages/UserSettings";
import SinglePing from "./pages/SinglePing";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthProvider } from "./utils/useAuthContext";
import { DashboardProvider } from "./utils/useDashboardContext";
import { withTheme } from "./withTheme";

function App(props) {
  const { darkMode, setDarkMode } = props;
  return (
    <AuthProvider>
      <DashboardProvider>
        <Router>
          <Nav darkMode={darkMode} setDarkMode={setDarkMode}/>
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route exact path="/portal">
              <Portal />
            </Route>
            <ProtectedRoute path="/user/:feedType" component={Dashboard} />
            <ProtectedRoute exact path="/settings" component={UserSettings} />
            <ProtectedRoute exact path="/ping/:pingId" component={SinglePing} />
          </Switch>
        </Router>
      </DashboardProvider>
    </AuthProvider>
  );
}

export default withTheme(App);
