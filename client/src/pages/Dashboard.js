import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import UserContainer from "../components/User/UserContainer";
import { useAuthContext } from '../utils/useAuthContext';
import Map from "../components/Map/Map";
import NewPing from "../components/Feed/NewPing";
import FeedType from "../components/Feed/FeedType";

import { useQuery } from "@apollo/client";
import { useDashboardContext } from "../utils/useDashboardContext";
import { FETCH_PINGS_BY_LOCATION } from "../utils/graphql";

export default function Dashboard() {
  const classes = useStyles();
  const { user } = useAuthContext();
  const [{userPosition}] = useDashboardContext();
  let long;
  let latt;

  if(userPosition) {
    long = userPosition.longitude;
    latt = userPosition.latitude;
  }

  const { subscribeToMore, data } = useQuery(FETCH_PINGS_BY_LOCATION,
    { skip: !userPosition, variables: { long, latt } });

  return (
    <div className={classes.root}>
      <div className={classes.grid}>
        <Grid container spacing={2}>
          <Grid
            item
            container
            direction="column"
            lg={4}
            justify="space-between"
          >
            <UserContainer />
            <Map data={data} />
          </Grid>

          <Grid item container direction="column" lg={8}>
            {user && <NewPing />}
            <FeedType subscribeToMore={subscribeToMore} data={data} />
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
