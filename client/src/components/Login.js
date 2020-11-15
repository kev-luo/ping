import React from 'react'
import { GraphQLClient } from 'graphql-request';
import { GoogleLogin } from 'react-google-login';

export default function Login() {
  

  return (
    <GoogleLogin 
      clientId={ process.env.REACT_APP_OAUTH_CLIENT_ID }
      onSuccess={ onSuccess }
      isSignedIn={ true }
    />
  )
}
