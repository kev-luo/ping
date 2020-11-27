import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Fade, Backdrop } from "@material-ui/core";

import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";

export default function UserSettingsModal(props) {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.isOpen}
      onClose={() => props.setIsOpen(!props.isOpen)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.isOpen} style={{ minHeight: "250px", minWidth: "250px" }}>
        {props.userSettings === "Update Profile Picture" ? (
          <UpdateUser setIsOpen={props.setIsOpen}/>
        ) : (
          <DeleteUser />
        )}
      </Fade>
    </Modal>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
