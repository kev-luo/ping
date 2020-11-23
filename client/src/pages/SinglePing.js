import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from '@material-ui/core';

import UserContainer from '../components/User/UserContainer';
import Map from '../components/Map/Map';
import Ping from "../components/SinglePing/Ping";

export default function SinglePing() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.grid}>
        <Grid container spacing={2}>
          <Grid
            item
            container
            direction="column"
            xs={4}
            justify="space-between"
          >
            <UserContainer />
            <Map />
          </Grid>

          <Grid item xs={8}>
            <Ping />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(1, 1),
  },
  grid: {
    margin: theme.spacing(2, 1),
  },
  paper: {
    padding: theme.spacing(2),
    // color: theme.palette.text.secondary,
  },
}));
