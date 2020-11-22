import React from "react";
import { useMutation } from "@apollo/client";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FaRegHeart } from "react-icons/fa";

import { SUPPORT_PING } from "../utils/graphql";

export default function SupportPing({ user, ping: { id } }) {
  const classes = useStyles();

  const [supportMutation] = useMutation(SUPPORT_PING, {
    variables: {
      pingId: id,
    },
    onError(err) {
      console.log(err);
    },
  });

  function handleClick() {
    if (user) {
      supportMutation();
    }
  }

  return (
    <IconButton onClick={handleClick}>
      <FaRegHeart className={classes.icon} size={15} />
    </IconButton>
  );
}

const useStyles = makeStyles((themes) => ({
  icon: {
    color: "red",
  },
}));
