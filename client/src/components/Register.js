import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useForm } from "../utils/useForm";
import { REGISTER_USER } from "../utils/graphql";

const useStyles = makeStyles((themes) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    "& > *": {
      flexGrow: 1,
      margin: themes.spacing(0.5, 1),
    },
  },
}));

export default function Register(props) {
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { handleChange, handleSubmit, values } = useForm(
    registerUser,
    initialState
  );
  const [addUser] = useMutation(REGISTER_USER, {
    variables: values,
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    update(_, result) {
      props.history.push("/");
    },
  });

  function registerUser() {
    addUser();
  }
  return (
    <>
      <form className={classes.root} noValidate onSubmit={handleSubmit}>
        <TextField
          label="Username"
          type="text"
          name="username"
          value={values.username}
          error={errors.username ? true : false}
          helperText={errors.username}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          type="email"
          name="email"
          value={values.email}
          error={errors.email ? true : false}
          helperText={errors.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={values.password}
          error={errors.password ? true : false}
          helperText={errors.password}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          helperText={errors.confirmPassword}
          onChange={handleChange}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: "1rem" }}
        >
          Sign-Up
        </Button>
      </form>
    </>
  );
}
