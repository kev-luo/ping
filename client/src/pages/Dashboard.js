import React, { useContext, useReducer } from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Nav from "../components/Nav";
import Feed from "../components/Feed";
import Ping from "../components/Ping";
import Login from "../components/Login";
import Register from "../components/Register";
import ProfileBox from '../components/ProfileBox';
import { useAuthContext } from '../utils/useAuthContext';
import { selectionSetMatchesResult } from "@apollo/client/cache/inmemory/helpers";

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

const DashboardContext = React.createContext({
  board: "",
  details: ""
});

const initialState = { board: "rawfeed" }

function reducer(state, action) {
  switch (action.type) {
    case "rawfeed":
      return {
        ...state,
        board: "rawfeed",
        details: ""
      }
    case "ping":
      return {
        ...state,
        board: "ping",
        details: action.pingId
      }
    case "supportedpings":
      return {
        ...state,
        board: "supportedpings"
      }
  }
}

export function useDashboardContext() {
  return useContext(DashboardContext)
}

export default function Dashboard() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();
  const context = useAuthContext();
  return (
    <div className={classes.root}>
      <Nav />
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
                {context.user ? (
                  <ProfileBox />
                ) : (
                    <Login />
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
            <DashboardContext.Provider value={[state, dispatch]}>
              <Paper
                style={{
                  backgroundColor: "#fcf8f2",
                  height: "80vh",
                  overflow: "auto",
                }}
                className={classes.paper}
              >
                {state.board === "ping" ? <Ping /> : <Feed />}
              </Paper>
              {/* {console.log(state)} */}
            </DashboardContext.Provider>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
