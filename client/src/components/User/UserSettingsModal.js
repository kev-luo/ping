import React from "react";
import { Modal, Fade, Button } from '@material-ui/core';
import { MdDelete } from 'react-icons/md';

export default function UserSettingsModal() {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openDel}
      onClose={handleOpenDel}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openDel} style={{ minHeight: "250px", minWidth: "250px" }}>
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
      </Fade>
    </Modal>
  );
}
