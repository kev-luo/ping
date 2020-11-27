import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { FiImage } from "react-icons/fi";
import { useMutation } from "@apollo/client";

import { useForm } from "../../utils/useForm";
import { UPDATE_USER } from "../../utils/graphql";

export default function UpdateUser(props) {
  const classes = useStyles();
  const initialState = { imageUrl: "" };
  const { handleChange, handleSubmit, values, previewSource } = useForm(
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
        <label className={classes.fileBtn} htmlFor="file">
          Choose a file
        </label>
        <Button type="submit" endIcon={<FiImage />}>
          Set Picture
        </Button>
        {previewSource && (
          <img
            src={previewSource}
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
  fileBtn: {
    border: "2px solid black",
    padding: "10px",
  },
  imgPrev: {
    height: "250px",
    display: "block",
    margin: "0 auto",
    marginTop: 20,
  },
}));
