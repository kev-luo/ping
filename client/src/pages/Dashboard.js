import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/client";
import { useRouteMatch, useLocation } from "react-router-dom";

import { useAuthContext } from "../utils/useAuthContext";
import { FETCH_PINGS_QUERY } from "../utils/graphql";
import UserContainer from "../components/User/UserContainer";
import Map from "../components/Map/Map";
import Feed from "../components/Feed/Feed";

export default function Dashboard() {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { loading, data } = useQuery(FETCH_PINGS_QUERY);

  let message = null;
  if (loading) message = <div>Loading...</div>;
  if (!data) message = <div>No data found!</div>;

  console.log(pathname);

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
            {message || <Feed data={data.getPings}/>}
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
