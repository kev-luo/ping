import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

import ProfileBox from "./ProfileBox";
import About from "./About";
import { useAuthContext } from '../../utils/useAuthContext';

export default function UserContainer() {
  const classes = useStyles();
  const authContext = useAuthContext();
  return (
    <Grid item>
      <Paper className={classes.paper}>
        {authContext.user ? <ProfileBox /> : <About />}
      </Paper>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    backgroundColor: "#fcf8f2"
  },
}));
