import React, { useState } from "react";
import { Tabs, Tab } from "@material-ui/core";

import Login from "../components/User/Login";
import Register from "../components/User/Register";

export default function SignUpOrIn(props) {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Tabs variant="fullWidth" value={selectedTab} onChange={handleChange}>
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>
      {selectedTab === 0 && <Login />}
      {selectedTab === 1 && <Register />}
    </>
  );
}