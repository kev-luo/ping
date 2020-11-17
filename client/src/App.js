import React from 'react';
import Dashboard from './pages/Dashboard';

import { AuthProvider } from './utils/useAuthContext';

function App() {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
}

export default App;
