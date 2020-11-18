import React from "react";
import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";

import { useAuthContext } from '../utils/useAuthContext';
import { FETCH_PING_QUERY } from "../utils/graphql";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2, 1),
    padding: theme.spacing(0, 2),
    paddingRight: 0,
  },
  pic: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  date: {
    color: theme.palette.text.secondary,
    fontSize: 12,
  },
}));

function openPing(id) {
  console.log(id);
}

export default function Feed() {
  const classes = useStyles();
  // const context = useAuthContext();
  const { loading, data } = useQuery(FETCH_PING_QUERY, {variables: { pingId: "5fb4ae7d1711c43b03b8f162" }});
  

  if(!loading){
    console.log(data);
  }
  

  return (
    <>
      <h1>TEST</h1>
    </>
  );
}
