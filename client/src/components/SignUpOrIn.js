import React, { useState } from 'react'
import { Tabs, Tab, AppBar } from '@material-ui/core';

import Login from './Login';
import Register from './Register';

export default function SignUpOrIn() {

  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (_, newValue) => {
    setSelectedTab(newValue);
  }

  return (
    <>
      <Tabs variant="fullWidth" value={selectedTab} onChange={handleChange}>
        <Tab label="Login"/>
        <Tab label="Register"/>
      </Tabs>
    {selectedTab === 0 && <Login />}
    {selectedTab === 1 && <Register />}
    </>
  );
}
