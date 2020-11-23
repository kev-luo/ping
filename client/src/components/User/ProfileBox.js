import React from "react";
import { useQuery } from "@apollo/client";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Actions from "../../utils/dashboardActions";
import { useAuthContext } from "../../utils/useAuthContext";
import { useDashboardContext } from "../../utils/useDashboardContext";
import { FETCH_USER_QUERY, FETCH_SUPPORTED_PINGS_QUERY } from "../../utils/graphql";

export default function ProfileBox() {
  const classes = useStyles();
  const { user } = useAuthContext();
  const [state, dispatch] = useDashboardContext();

  const currentUser = state.selectedUser || user

  const { loading, data } = useQuery(FETCH_USER_QUERY, {
    variables: { userId: currentUser.id },
  });

  const postedPings = () => {
    const pingData = data.getUser.pings.map((ping) => {
      return {
        ...ping,
        author: {
          id: currentUser.id,
          username: currentUser.username,
        },
      };
    });
    dispatch({ type: Actions.TOGGLE_FEED, payload: pingData });
  };

  const supportedPings = () => {
    // const supportedPings = useQuery(FETCH_SUPPORTED_PINGS_QUERY, {
    //   variables: { userId: state.selectedUser.id || user.id }
    // })
    // if(supportedPings) {
    //   console.log(supportedPings);
    // }
  }

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
            <Button onClick={supportedPings}>Supported Pings</Button>
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
