import React from "react";
import { Button } from '@material-ui/core';
import { MdDelete } from 'react-icons/md';

export default function DeleteUser() {
  return (
    <div className={classes.paper}>
      <label>Please confirm your password</label>
      <br />
      <input
        type="password"
        onChange={handleChange}
        value={values.password}
        name="password"
      />
      <Button onClick={deleteUserCb}>
        <MdDelete />
      </Button>
    </div>
  );
}
