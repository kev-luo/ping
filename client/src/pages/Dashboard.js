import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRouteMatch, Route, useLocation } from "react-router-dom";

import UserContainer from "../components/User/UserContainer";
import Map from "../components/Map/Map";
import Feed from "../components/Feed/Feed";

export default function Dashboard() {
  const classes = useStyles();
  const route = useRouteMatch();
  const location = useLocation();
  console.log(location);

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
            <Feed />
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
