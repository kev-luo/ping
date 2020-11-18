import React from 'react'
import { Paper, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import { CREATE_PING } from '../utils/graphql';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2, 1),
    padding: theme.spacing(2, 2),
    display: 'flex',
  }
}));

export default function NewPing() {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <form>
        <TextField />
      </form>
    </Paper>
  )
}
