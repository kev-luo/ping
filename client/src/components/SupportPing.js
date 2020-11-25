import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { FaRegHeart, FaRegMinusSquare } from "react-icons/fa";

import { FETCH_SUPPORTED_PINGS_QUERY, SUPPORT_PING } from "../utils/graphql";

export default function SupportPing({ user, ping }) {
  const classes = useStyles();
  const [suppOrNot, setSuppOrNot] = useState(isSupported());

  const [supportMutation] = useMutation(SUPPORT_PING, {
    variables: { pingId: ping.id },
    onError(err) {
      console.log(err);
    },
  });

  function handleClick() {
    if (user) {
      supportMutation();
    }
  }

  function isSupported() {
    const supportedUsers = ping.support.filter((supporter) => {
      return supporter.supported && supporter.user.id === user?.id;
    });
    return supportedUsers.length === 0;
  }

  const displayIcon = suppOrNot ? (
    <FaRegHeart className={classes.support} size={15} />
  ) : (
    <FaRegMinusSquare className={classes.dismiss} size={15} />
  )

  return (
    <IconButton onClick={handleClick}>
      {displayIcon}
    </IconButton>
  );
}

const useStyles = makeStyles((themes) => ({
  support: {
    color: "red",
  },
  dismiss: {
    color: "gray"
  }
}));
