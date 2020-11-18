import React, { useState } from 'react'
import { Tabs, Tab, AppBar } from '@material-ui/core';

export default function SignUpOrIn(props) {

  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedTab(value);
  }

  return (
    <Tabs value={selectedTab} onChange={handleChange}>
      <Tab label="Item One" />
      <Tab label="Item Two" />
      <Tab label="Item Three" />
    </Tabs>
  );
}
