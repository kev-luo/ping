import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';
import Actions from "../../utils/dashboardActions";
import { useForm } from "../../utils/useForm";
import { useAuthContext } from "../../utils/useAuthContext";
import { useDashboardContext } from "../../utils/useDashboardContext";
import { LOGIN_USER } from "../../utils/graphql";

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const context = useAuthContext();
  const [_, dispatch] = useDashboardContext();
  const [errors, setErrors] = useState({});
  const initialState = {
    username: "",
    password: "",
  };
  const { handleChange, handleSubmit, values } = useForm(loginCb, initialState);

  const [loginUser] = useMutation(LOGIN_USER, {
    variables: values,
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    update(_, result) {
      context.login(result.data.login);
<<<<<<< HEAD
      history.push("/");
      // console.log(result.data.login)
      dispatch({ type: Actions.SELECT_USER, payload: result.data.login })
=======
      history.push(`/user/${result.data.login.id}`);
>>>>>>> origin
    },
  });

  function loginCb() {
    loginUser();
  }
  return (
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
          style={{ margin: "1rem 5px" }}
        >
          Login
        </Button>
      </form>
    </>
  );
}

const useStyles = makeStyles((themes) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  textfield: {
    margin: themes.spacing(1, 1),
  },
}));
