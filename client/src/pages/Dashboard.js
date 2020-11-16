import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Nav from '../components/Nav';
import Feed from '../components/Feed';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(1,1)
  },
  grid: {
    margin: theme.spacing(1,1)
  },
  paper: {
    padding: theme.spacing(2),
    // color: theme.palette.text.secondary,
  }
}))

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Nav />
      <div className={classes.grid}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Typography>
                ProfileProfileProfileProfileProfileProfileProfileProfileProfile
                ProProfileProfileProfileProfileProfileProfileProfileProfileProfilefile
                ProfProfileProfileProfileProfileProfileProfileProfileProfileProfileile
                ProProfileProfileProfileProfileProfileProfileProfileProfileProfilefile
                PrProfileProfileProfileProfileProfileProfileProfileProfileProfileofile
                PrProfileProfileProfileProfileProfileProfileProfileProfileProfileofile
                PrProfileProfileProfileProfileProfileProfileProfileProfileProfileofile
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper className={classes.paper}><Feed /></Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>Map</Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
