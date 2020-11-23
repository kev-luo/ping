import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRouteMatch } from "react-router-dom";

import UserContainer from "../components/User/UserContainer";
import Map from "../components/Map/Map";
import Feed from "../components/Feed/Feed";

<<<<<<< HEAD
export default function Dashboard() {
  const classes = useStyles();
  const path = useRouteMatch();
  console.log(path);
=======
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

function Dashboard(props) {
  const classes = useStyles();
  const authContext = useAuthContext();
  const [state] = useDashboardContext();
  // console.log(props);
>>>>>>> 1d96ee85f5c7db3340f2f4edab1756b285a418a6

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
