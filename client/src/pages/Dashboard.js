import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from 'react-router-dom';

import About from '../components/About';
import Feed from "../components/Feed/Feed";
import Ping from "../components/SinglePing/Ping";
import ProfileBox from '../components/ProfileBox';
import { useAuthContext } from '../utils/useAuthContext';
import { useDashboardContext } from '../utils/useDashboardContext';


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
  console.log(props);

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
            <Grid item>
              <Paper
                style={{ backgroundColor: "#fcf8f2" }}
                className={classes.paper}
              >
                {authContext.user ? (
                  <ProfileBox />
                ) : (
                    <About />
                  )}
              </Paper>
            </Grid>
            <Grid item>
              <Paper
                style={{ backgroundColor: "#fcf8f2" }}
                className={classes.paper}
              >
                Map
              </Paper>
            </Grid>
          </Grid>

          <Grid item xs={8}>
            <Paper
              style={{
                backgroundColor: "#fcf8f2",
                height: "80vh",
                overflow: "auto",
              }}
              className={classes.paper}
            >
            <Switch>
              <Route path={`/ping`}><div>hello</div></Route>
            </Switch>
              {state.board === "ping" ? <Ping /> : <Feed />}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}


export default Dashboard;