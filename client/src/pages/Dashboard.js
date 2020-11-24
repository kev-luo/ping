import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  useRouteMatch,
  useParams,
  useLocation,
  Route,
  Switch,
} from "react-router-dom";

import { useAuthContext } from "../utils/useAuthContext";
import {
  FETCH_PINGS_QUERY,
  FETCH_SUPPORTED_PINGS_QUERY,
  FETCH_USER_QUERY,
} from "../utils/graphql";
import UserContainer from "../components/User/UserContainer";
import Map from "../components/Map/Map";
import Feed from "../components/Feed/Feed";
import Loading from "../components/Loading";

export default function Dashboard() {
  const classes = useStyles();
  const route = useRouteMatch();
  const routeParam = useParams();
  const { pathname } = useLocation();
  const allPings = useQuery(FETCH_PINGS_QUERY, { skip: !route.isExact });
  const suppPings = useQuery(FETCH_SUPPORTED_PINGS_QUERY, {
    skip: pathname.split("/")[2] !== "supported",
    variables: { userId: pathname.split("/")[3] },
  });
  const userPings = useQuery(FETCH_USER_QUERY, {
    skip: pathname.split("/")[2] !== "pinged",
    variables: { userId: pathname.split("/")[3] },
  });

  const pingedData = userPings.data?.getUser.pings.map((ping) => {
    const author = userPings.data.getUser;
    return { ...ping, author: { id: author.id, username: author.username } };
  });

  console.log(pingedData);

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
              <Route exact path="/">
                {allPings.data ? (
                  <Feed data={allPings.data.getPings} />
                ) : (
                  <Loading />
                )}
              </Route>
              <Route exact path="/user/pinged/:userId">
                {userPings.data ? <Feed data={pingedData} /> : <Loading />}
              </Route>
              <Route exact path={`${route.url}/:userId`}>
                {suppPings.data ? (
                  <Feed data={suppPings.data.getSupportedPings} />
                ) : (
                  <Loading />
                )}
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
