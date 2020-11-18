import React from 'react';
import { useQuery } from "@apollo/client";

import { makeStyles } from '@material-ui/core/styles';

import { useAuthContext } from "../utils/useAuthContext";
import { FETCH_USER_QUERY } from "../utils/graphql";


const useStyles = makeStyles(themes => ({
  handle: {
    textAlign: "center"
  }
}))

export default function ProfileBox() {
  const classes = useStyles();
  const { user } = useAuthContext();
  const { loading, data } = useQuery(FETCH_USER_QUERY, { variables: { userId: user.id } } );

  // useStyles


  return (
    <div>
      {loading ||
      <h1 className={classes.handle}>{"@" + data.getUser.username}</h1>
      }
    </div>
  )
}
