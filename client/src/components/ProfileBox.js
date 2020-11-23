import React from "react";
import { useQuery } from "@apollo/client";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useAuthContext } from "../utils/useAuthContext";
import { useDashboardContext } from "../utils/useDashboardContext";
import { FETCH_USER_QUERY } from "../utils/graphql";

export default function ProfileBox() {
  const classes = useStyles();
  const { user } = useAuthContext();
  const [state] = useDashboardContext();
  const { loading, data } = useQuery(FETCH_USER_QUERY, {
    variables: { userId: user.id },
  });

  if (!loading) {
    console.log(data.getUser);
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
            <Button>Posted Pings</Button>
            <Button>Supported Pings</Button>
          </>
        ) : (
          <>
            <Typography
              variant="h4"
              className={classes.handle}
            >{`@${data.getUser.username}`}</Typography>
            <Button>Posted Pings</Button>
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
