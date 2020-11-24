import React from "react";
import { useQuery } from "@apollo/client";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {RiUserSettingsLine} from "react-icons/ri";
import {Link} from "react-router-dom";

import Actions from "../../utils/dashboardActions";
import { useAuthContext } from "../../utils/useAuthContext";
import { useDashboardContext } from "../../utils/useDashboardContext";
import {
  FETCH_USER_QUERY,
  FETCH_SUPPORTED_PINGS_QUERY,
} from "../../utils/graphql";

export default function ProfileBox() {
  const classes = useStyles();
  const { user } = useAuthContext();
  const [state, dispatch] = useDashboardContext();

  const currentUser = state.selectedUser || user;

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

  return (
    <div className={classes.root}>
      {loading ||
        (state.selectedUser ? (
          <>
            <Typography
              variant="h4"
              className={classes.handle}
            >{`@${state.selectedUser.username}`}</Typography>
            <Button>Supported Pings</Button>
            <Button onClick={postedPings}>Posted Pings</Button>
          </>
        ) : (
          <>
          <Link to="settings">
          <RiUserSettingsLine style={{float: "right"}} />
          </Link>
            
            <Typography
              variant="h4"
              className={classes.handle}
            >{`@${data.getUser.username}`}</Typography>
            <Link to={`/user/supported/${data.getUser.id}`}>
              <Button onClick={postedPings}>Supported Pings</Button>
            </Link>
            <Link to={`/user/pinged/${data.getUser.id}`}>
              <Button>Posted Pings</Button>
            </Link>
          </>
        ))}
    </div>
  );
}

const useStyles = makeStyles((themes) => ({
  handle: {
    textAlign: "center",
  },
  root: {
    "& > *": {
      textDecoration: "none",
    },
  },
}));
