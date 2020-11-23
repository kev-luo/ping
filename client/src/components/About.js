import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function About() {
  const classes = useStyles();
  return (
    <Grid item>
      <Paper style={{ backgroundColor: "#fcf8f2" }} className={classes.paper}>
        <Typography variant="h4">Welcome to Ping</Typography>
        <Typography variant="p">
          Ping helps the community by keeping users informed of local events.
          Users post information about things happening around them to create a
          web of real-time event announcements. Pings are automatically deleted
          after 24 hours to keep the information fresh.
        </Typography>
        <Button>
          <Link to="/portal">Login or Register Here</Link>
        </Button>
      </Paper>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    // color: theme.palette.text.secondary,
  },
}));
