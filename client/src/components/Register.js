import React from 'react'
import { Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useForm from '../utils/useForm';

const useStyles = makeStyles(themes => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    '& > *': {
      flexGrow: 1,
      margin: themes.spacing(1,1),
    }
  }
}))

export default function Register() {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h6">Register</Typography>
      <form className={classes.root} >
        <TextField
          label="Username"
          type="text"
        />
        <TextField
          label="Email"
          type="email"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
        >
          Sign-Up
        </Button>
      </form>
    </>
  )
}
