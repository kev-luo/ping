import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AiFillDelete } from "react-icons/ai";

import {
  DELETE_COMMENT,
  DELETE_PING,
  FETCH_PINGS_QUERY,
} from "../utils/graphql";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function DeleteButton({ pingId }) {
  const [open, setOpen] = useState(false);

  const [deleteItem] = useMutation(DELETE_PING, {
    variables: { pingId },
    update(proxy, result) {
      setOpen(false);
      const data = proxy.readQuery({
        query: FETCH_PINGS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_PINGS_QUERY,
        data: {
          getPings: data.getPings.filter((ping) => ping.id !== pingId),
        },
      });
    },
  });

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <AiFillDelete style={{ color: "gray" }} size={17} />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Are you sure you want to delete this ping?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Once confirmed, this action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Disagree
          </Button>
          <Button onClick={deleteItem} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
