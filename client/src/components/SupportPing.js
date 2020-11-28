import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { IconButton, Tooltip, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { FaRegHeart, FaRegMinusSquare } from "react-icons/fa";

import { SUPPORT_PING } from "../utils/graphql";

export default function SupportPing({ user, ping }) {
  const classes = useStyles();
  const [showFb, setShowFb] = useState(false);

  const [supportMutation] = useMutation(SUPPORT_PING, {
    onError(err) {
      console.log(err);
    },
  });

  function handleClick(suppBool) {
    if (user) {
      const alreadySupported = ping.support.filter(supporter => {
        return supporter.supported === suppBool && supporter.user.id === user.id
      })
      if(alreadySupported.length === 1) {
        setShowFb(true);
      } else {
        supportMutation({variables: {pingId: ping.id, support: suppBool}});
      }
    }
  }

  function handleClose() {
    setShowFb(false);
  }

  return (
    <>
    <Tooltip title="Support">
      <IconButton onClick={() => handleClick(true)}><FaRegHeart className={classes.support} size={15} /></IconButton>
    </Tooltip>
    <Tooltip title="Dismiss">
      <IconButton onClick={() => handleClick(false)}><FaRegMinusSquare className={classes.dismiss} size={15} /></IconButton>
    </Tooltip>
    <Snackbar 
    anchorOrigin={{vertical: "bottom", horizontal: "center"}}
      open={showFb}
      onClose={handleClose}
      message="You've done this already."
    />
    </>
  );
}

const useStyles = makeStyles((themes) => ({
  support: {
    color: "red",
  },
  dismiss: {
    color: "gray",
  },
}));
