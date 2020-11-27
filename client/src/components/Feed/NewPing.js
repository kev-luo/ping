import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Paper,
  Button,
  TextField,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import { green } from "@material-ui/core/colors";

import { CREATE_PING } from "../../utils/graphql";
import { useForm } from "../../utils/useForm";

export default function NewComment() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const initialState = { body: "", imageUrl: "" };
  const { handleChange, handleSubmit, values, previewSource } = useForm(
    createPingCb,
    initialState
  );

  const [createPing] = useMutation(CREATE_PING, {
    onError(err) {
      console.log(err);
    },
    update() {
      values.body = "";
      setIsLoading(!isLoading);
    },
  });

  function createPingCb(img) {
    createPing({ variables: { ...values, imageUrl: img } });
  }

  function loaderSubmit(e) {
    setIsLoading(!isLoading);
    handleSubmit(e);
  }

  return (
    <Paper className={classes.paper}>
      <form style={{ display: "flex" }} onSubmit={loaderSubmit}>
        <Grid container alignItems="center" justify="center">
          <Grid item xs={10}>
            <TextField
              name="body"
              value={values.body}
              onChange={handleChange}
              rowsMax="3"
              multiline
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <div size="small" className={classes.buttonGroup}>
              <Button type="submit" endIcon={<SendIcon />}>
                Ping
              </Button>
              {isLoading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </Grid>
          <Grid item style={{ margin: 10, marginTop: 25 }}>
            <label className={classes.fileBtn} htmlFor="file">
              Choose a file
            </label>
            <input
              id="file"
              style={{ display: "none" }}
              type="file"
              onChange={handleChange}
              name="imageUrl"
              accept="image/*"
            />
          </Grid>
        </Grid>
      </form>
      {previewSource && (
        <img
          src={previewSource}
          alt="preview of choosen file"
          className={classes.imgPrev}
        />
      )}
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2, 1),
    padding: theme.spacing(2, 2),
  },
  buttonGroup: {
    margin: theme.spacing(1),
    position: "relative",
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
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));
