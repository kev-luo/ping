import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { FiImage } from "react-icons/fi";
import { useMutation } from "@apollo/client";

import { useForm } from "../../../utils/useForm";
import { UPDATE_USER } from "../../../utils/graphql";

export default function UpdateUser(props) {
  const classes = useStyles();
  const initialState = { imageUrl: "" };
  const { handleChange, handleSubmit, values } = useForm(
    updateUserCb,
    initialState
  );

  const [updateUser] = useMutation(UPDATE_USER, {
    onError(err) {
      console.log(err);
    },
  });

  function updateUserCb(img) {
    updateUser({ variables: { ...values, imageUrl: img } });
    props.setIsOpen(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.paper}>
        <input
          id="file"
          style={{ display: "none" }}
          type="file"
          onChange={handleChange}
          name="imageUrl"
          accept="image/*"
        />
        <Button component="label" htmlFor="file">
          Choose a file
        </Button>
        <Button type="submit" disabled={values.imageUrl ? false : true} endIcon={<FiImage />}>
          Set Picture
        </Button>
        {values.imageUrl && (
          <img
            src={values.imageUrl[0]}
            alt="preview of choosen file"
            className={classes.imgPrev}
          />
        )}
      </div>
    </form>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  imgPrev: {
    height: "250px",
    display: "block",
    margin: "0 auto",
    marginTop: 20,
  },
}));
