import React, { useState } from "react";
import { Tabs, Tab } from "@material-ui/core";

import Login from "../components/Login";
import Register from "../components/Register";

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
      {selectedTab === 0 && <Login history={props.history}/>}
      {selectedTab === 1 && <Register history={props.history}/>}
    </>
  );
}