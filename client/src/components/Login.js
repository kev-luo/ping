import React from 'react'
// import { GraphQLClient } from 'graphql-request';
// import { GoogleLogin } from 'react-google-login';
import { Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(themes => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    '&>*': {
      flexGrow: 1,
    }
  },
  textfield: {
    margin: themes.spacing(1,1),
  }
}))

export default function Login() {
  
  const classes = useStyles();
  return (
    // <GoogleLogin 
    //   clientId={ process.env.REACT_APP_OAUTH_CLIENT_ID }
    //   onSuccess={ onSuccess }
    //   isSignedIn={ true }
    // />
    <>
      <Typography variant="h6">Login</Typography>
      <form className={classes.root} >
        <TextField
          label="Email"
          type="email"
          className={classes.textfield}
        />
        <TextField
          label="Password"
          type="password"
          className={classes.textfield}
        />
        <Button
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </form>
    </>
  )
}
