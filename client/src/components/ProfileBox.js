import React from 'react';
import { useQuery } from "@apollo/client";
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useAuthContext } from "../utils/useAuthContext";
import { useDashboardContext } from '../utils/useDashboardContext';
import { FETCH_USER_QUERY } from "../utils/graphql";


const useStyles = makeStyles(themes => ({
  handle: {
    textAlign: "center"
  }
}))

export default function ProfileBox() {
  const classes = useStyles();
  const { user } = useAuthContext();
  const [state] = useDashboardContext();
  const { loading, data } = useQuery(FETCH_USER_QUERY, { variables: { userId: user.id } } );

  if(state.selectedUser) {
    console.log(state.selectedUser);
  }

  return (
    <div>
      {loading || (
        state.selectedUser ? (
          <Typography variant="h4" className={classes.handle}>{`@${state.selectedUser}`}</Typography>
        ) : (
          <Typography variant="h4" className={classes.handle}>{`@${data.getUser.username}`}</Typography>
        )
      )}
    </div>
  )
}

{/* <h1 className={classes.handle}>{"@" + data.getUser.username}</h1> */}