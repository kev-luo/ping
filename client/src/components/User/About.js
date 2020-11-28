import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function About() {
  const classes = useStyles();
  return (
    <Grid item>
      <Typography variant="h4">Welcome to Ping</Typography>
      <Typography variant="body1">
        Ping helps the community by keeping users informed of local events.
        Users post information about things happening around them to create a
        web of real-time event announcements. Pings are automatically deleted
        after 24 hours to keep the information fresh.
      </Typography>
      <Link to="/portal" className={classes.portalBtn}>
        <Button
          variant="contained"
          color="primary"
        >Get Started!</Button>
      </Link>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  portalBtn: {
    textDecoration: "none",
  },
}));
