import React from "react";
import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";

import { useDashboardContext } from "../pages/Dashboard";
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
  const [state, dispatch] = useDashboardContext();
  const { loading, data } = useQuery(FETCH_PING_QUERY, {variables: { pingId: "5fb4ae7d1711c43b03b8f162" }});

  console.log(dispatch);

  return (
    <>
      <h1 onClick={() => dispatch({ type: "rawfeed" })}>TEST</h1>
    </>
  );
}
