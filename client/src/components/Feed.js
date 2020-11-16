import React from 'react'
import { Grid, Paper, Avatar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(2,0)
  }
}))

export default function Feed() {
  const classes = useStyles();
  const message = "posts go here where they belong"
  return (
    <>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs>
            <Typography>{message}</Typography>
          </Grid>
          <Grid item>
            <Avatar>Pic</Avatar>
          </Grid>
        </Grid>
      </Paper>

      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs>
            <Typography>{message}</Typography>
          </Grid>
          <Grid item>
            <Avatar>Pic</Avatar>
          </Grid>
        </Grid>
      </Paper>

      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs>
            <Typography>{message}</Typography>
          </Grid>
          <Grid item>
            <Avatar>Pic</Avatar>
          </Grid>
        </Grid>
      </Paper>

      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs>
            <Typography>{message}</Typography>
          </Grid>
          <Grid item>
            <Avatar>Pic</Avatar>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}
