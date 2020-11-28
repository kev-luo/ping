import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, TextField } from "@material-ui/core";
import { MdDelete } from "react-icons/md";
import { useMutation } from "@apollo/client";
import { useHistory } from 'react-router-dom';

import Actions from "../../../utils/dashboardActions";
import { useAuthContext } from '../../../utils/useAuthContext';
import { useDashboardContext } from '../../../utils/useDashboardContext';
import { useForm } from "../../../utils/useForm";
import { DELETE_USER } from "../../../utils/graphql";

export default function DeleteUser() {
  const classes = useStyles();
  const history = useHistory();
  const context = useAuthContext();
  const [_, dispatch] = useDashboardContext();
  const initialState = { password: "" };
  const { handleChange, handleSubmit, values } = useForm(
    deleteUserCb,
    initialState
  );

  const [deleteUser] = useMutation(DELETE_USER, {
    onError(err) {
      console.log(err);
    },
    onCompleted() {
      dispatch({ type: Actions.CLEAR_USER });
      context.logout();
      history.push("/");
    },
  });

  function deleteUserCb() {
    deleteUser({ variables: { password: values.password } });
  }

  return (
    <div className={classes.paper}>
      <form onSubmit={handleSubmit}>
        <TextField
          type="password"
          onChange={handleChange}
          value={values.password}
          name="password"
          label="Confirm Password"
          variant="outlined"
        />
        <IconButton variant="contained" type="submit">
          <MdDelete />
        </IconButton>
      </form>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
