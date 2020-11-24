import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './components/Nav';
import Dashboard from "./pages/Dashboard";
import Portal from './pages/Portal';
import SinglePing from './pages/SinglePing';
import ProtectedRoute from './utils/ProtectedRoute';
import { AuthProvider } from "./utils/useAuthContext";
import { DashboardProvider } from "./utils/useDashboardContext";

function App() {
  return (
    <AuthProvider>
      <DashboardProvider>
        <Router>
        <Nav />
          <Switch>
            <Route exact path="/" >
              <Dashboard />
            </Route>
            <Route path="/user/:feedType" >
              <Dashboard />
            </Route>
            <Route exact path="/portal" >
              <Portal />
            </Route>
            <ProtectedRoute exact path="/ping/:pingId" component={SinglePing} />
          </Switch>
        </Router>
      </DashboardProvider>
    </AuthProvider>
  );
}

export default App;
