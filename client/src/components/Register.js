import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useForm } from '../utils/useForm';
import { REGISTER_USER } from '../utils/graphql';

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
  const [errors, setErrors] = useState({});
  const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  const { handleChange, handleSubmit, values } = useForm(registerUser, initialState);
  const [addUser] = useMutation(REGISTER_USER, {
    variable: { values },
    onError(err) {
      console.log(err.graphQLErrors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    update(_, result) {
      console.log(result);
    }
  })

  function registerUser() {
    addUser();
  }
  return (
    <>
      <Typography variant="h6">Register</Typography>
      <form className={classes.root} noValidate onSubmit={handleSubmit}>
        <TextField
          label="Username"
          type="text"
          name="username"
          value={values.username}
          error={errors.username ? true : false}
          helperText={errors.username && errors.username}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          type="email"
          name="email"
          value={values.email}
          error={errors.email ? true : false}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={handleChange}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Sign-Up
        </Button>
      </form>
    </>
  )
}
