import React from 'react'
// import { GraphQLClient } from 'graphql-request';
// import { GoogleLogin } from 'react-google-login';
import { Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useForm } from '../utils/useForm';

const useStyles = makeStyles(themes => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  textfield: {
    margin: themes.spacing(1,1),
  }
}))

export default function Login() {
  const classes = useStyles();
  const initialState = {
    username: '',
    password: '',
  }
  const { handleChange, handleSubmit, values } = useForm(loginUser, initialState);

  function loginUser() {
    console.log('hello');
  }
  return (
    // <GoogleLogin 
    //   clientId={ process.env.REACT_APP_OAUTH_CLIENT_ID }
    //   onSuccess={ onSuccess }
    //   isSignedIn={ true }
    // />
    <>
      <Typography variant="h6">Login</Typography>
      <form className={classes.root} noValidate onSubmit={handleSubmit}>
        <TextField
          label="Username"
          type="text"
          name="username"
          className={classes.textfield}
          fullWidth
          value={values.username}
          onChange={handleChange}
          error={false}
          helperText={""}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          className={classes.textfield}
          fullWidth
          value={values.password}
          onChange={handleChange}
          error={false}
          helperText={""}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "1rem 5px"}}
        >
          Login
        </Button>
      </form>
    </>
  )
}
