import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
// import { GraphQLClient } from 'graphql-request';
// import { GoogleLogin } from 'react-google-login';
import { Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useForm } from '../utils/useForm';
import { useAuthContext } from '../utils/useAuthContext';
import { LOGIN_USER } from '../utils/graphql';

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
  const context = useAuthContext();
  const [errors, setErrors] = useState({});
  const initialState = {
    username: '',
    password: '',
  }
  const { handleChange, handleSubmit, values } = useForm(loginCb, initialState);

  const [loginUser] = useMutation(LOGIN_USER, {
    variables: values,
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    update(_, result) {
      context.login(result.data.login)
    }
  })

  function loginCb() {
    loginUser();
  }
  return (
    // <GoogleLogin 
    //   clientId={ process.env.REACT_APP_OAUTH_CLIENT_ID }
    //   onSuccess={ onSuccess }
    //   isSignedIn={ true }
    // />
    <>
      <form className={classes.root} noValidate onSubmit={handleSubmit}>
        <TextField
          label="Username"
          type="text"
          name="username"
          className={classes.textfield}
          fullWidth
          value={values.username}
          onChange={handleChange}
          error={errors.username ? true : false}
          helperText={errors.username}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          className={classes.textfield}
          fullWidth
          value={values.password}
          onChange={handleChange}
          error={errors.password ? true : false}
          helperText={errors.password}
        />
        <Button
          type="submit"
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
