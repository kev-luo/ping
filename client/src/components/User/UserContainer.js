import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

import Actions from "../../utils/dashboardActions";
import ProfileBox from "./ProfileBox";
import About from "./About";
import { useDashboardContext } from "../../utils/useDashboardContext";
import { useAuthContext } from "../../utils/useAuthContext";
import { FETCH_USER_QUERY } from "../../utils/graphql";

export default function UserContainer() {
  const classes = useStyles();
  const { user } = useAuthContext();
  const [state, dispatch] = useDashboardContext();

  useEffect(() => {
    if (!state.selectedUser) {
      dispatch({ type: Actions.SELECT_USER, payload: user });
    }
  }, [user]);

  const { data } = useQuery(FETCH_USER_QUERY, {
    skip: !state.selectedUser,
    variables: { userId: state.selectedUser?.id },
  });

  return (
    <Paper className={classes.paper}>
      <Grid item>
        {user ? <ProfileBox userData={data?.getUser} /> : <About />}
      </Grid>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    background: theme.palette.primary.main
  },
}));
