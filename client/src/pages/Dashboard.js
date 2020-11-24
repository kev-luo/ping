import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useAuthContext } from "../utils/useAuthContext";
import UserContainer from "../components/User/UserContainer";
import Map from "../components/Map/Map";
import FeedType from "../components/Feed/FeedType";

export default function Dashboard() {
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
            <FeedType />
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
