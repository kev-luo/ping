import React from "react";
import { useQuery } from "@apollo/client";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Actions from "../utils/dashboardActions";
import { useAuthContext } from "../utils/useAuthContext";
import { useDashboardContext } from "../utils/useDashboardContext";
import { FETCH_USER_QUERY } from "../utils/graphql";

export default function ProfileBox() {
  const classes = useStyles();
  const { user } = useAuthContext();
  const [state, dispatch] = useDashboardContext();
  const { loading, data } = useQuery(FETCH_USER_QUERY, {
    variables: { userId: user.id },
  });

  const postedPings = () => {
    const pingData = data.getUser.pings.map((ping) => {
      return {
        ...ping,
        author: {
          id: data.getUser.id || user.id,
          username: data.getUser.username || user.username,
        },
      };
    });
    console.log(pingData);
    dispatch({ type: Actions.TOGGLE_FEED, payload: pingData });
  };

  return (
    <div>
      {loading ||
        (state.selectedUser ? (
          <>
            <Typography
              variant="h4"
              className={classes.handle}
            >{`@${state.selectedUser.username}`}</Typography>
            <Button onClick={postedPings}>Posted Pings</Button>
            <Button>Supported Pings</Button>
          </>
        ) : (
          <>
            <Typography
              variant="h4"
              className={classes.handle}
            >{`@${data.getUser.username}`}</Typography>
            <Button onClick={postedPings}>Posted Pings</Button>
            <Button>Supported Pings</Button>
          </>
        ))}
    </div>
  );
}

const useStyles = makeStyles((themes) => ({
  handle: {
    textAlign: "center",
  },
}));
