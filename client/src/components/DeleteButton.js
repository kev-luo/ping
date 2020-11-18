import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AiFillDelete } from 'react-icons/ai';

import { DELETE_COMMENT, DELETE_PING } from '../utils/graphql';

const useStyles = makeStyles(themes => ({

}))

export default function DeleteButton({pingId}) {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    console.log('hi');
  }

  return (
    <>
      <IconButton>
        <AiFillDelete onClick={() => setOpen(!open)} style={{ color: "gray" }} size={17} />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={handleClose} color="primary">
              Agree
            </Button>
          </DialogActions>
      </Dialog>
    </>
  )
}
