import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useRouteMatch, useParams, Route, Switch, useLocation } from "react-router-dom";

import { useAuthContext } from "../utils/useAuthContext";
import { FETCH_PINGS_QUERY, FETCH_SUPPORTED_PINGS_QUERY } from "../utils/graphql";
import UserContainer from "../components/User/UserContainer";
import Map from "../components/Map/Map";
import Feed from "../components/Feed/Feed";

export default function Dashboard() {
  const classes = useStyles();
  const route = useRouteMatch();
  const routeParam = useParams();
  const { pathname } = useLocation();
  const [allPings, allPingsResult] = useLazyQuery(FETCH_PINGS_QUERY);
  const [suppPings, suppPingsResult] = useLazyQuery(FETCH_SUPPORTED_PINGS_QUERY, { variables: {pingId: pathname.split('/')[3]}})

  console.log("route params", routeParam);
  console.log("route match", route);

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
          <Switch>
            <Route path={`${route.url}/:userId`}>
              <Feed data={{}}/>
            </Route>
          </Switch>
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
