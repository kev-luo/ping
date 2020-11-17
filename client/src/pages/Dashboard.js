import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Nav from "../components/Nav";
import Feed from "../components/Feed";
import Login from "../components/Login";
import Register from "../components/Register";

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

export default function Dashboard() {
  const classes = useStyles();
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
                <Login />
                {/* <Register /> */}
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
              <Feed />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
