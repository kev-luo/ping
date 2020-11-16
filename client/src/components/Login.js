import React from 'react'
// import { GraphQLClient } from 'graphql-request';
// import { GoogleLogin } from 'react-google-login';
import { Typography, TextField } from '@material-ui/core';

export default function Login() {
  

  return (
    // <GoogleLogin 
    //   clientId={ process.env.REACT_APP_OAUTH_CLIENT_ID }
    //   onSuccess={ onSuccess }
    //   isSignedIn={ true }
    // />
    <>
      <Typography variant="h6">Login</Typography>
      <form>
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
        />
      </form>
    </>
  )
}
