import React from "react";
import Dashboard from "./pages/Dashboard";

import { AuthProvider } from "./utils/useAuthContext";
import { DashboardProvider } from "./utils/useDashboardContext";

function App() {
  return (
    <AuthProvider>
      <DashboardProvider>
        <Dashboard />
      </DashboardProvider>
    </AuthProvider>
  );
}

export default App;
