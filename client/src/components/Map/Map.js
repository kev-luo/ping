import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

export default function Map() {
  const classes = useStyles();
  return (
    <Grid item>
      <Paper className={classes.paper}>
        Map
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