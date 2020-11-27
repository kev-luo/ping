import React from "react";
import { useMutation } from "@apollo/client";
import { Paper, Button, ButtonGroup, TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import { CREATE_PING } from "../../utils/graphql";
import { useForm } from "../../utils/useForm";

export default function NewComment() {
  const classes = useStyles();
  const initialState = { body: "", imageUrl: "" };
  const {
    handleChange,
    handleSubmit,
    values,
    setFileInputState,
    setPreviewSource,
    previewSource,
  } = useForm(createPingCb, initialState);

  const [createPing] = useMutation(CREATE_PING, {
    onError(err) {
      console.log(err);
    },
    update() {
      values.body = "";
      setFileInputState("");
      setPreviewSource("");
    },
  });

  function createPingCb(img) {
    createPing({ variables: { ...values, imageUrl: img } });
  }

  return (
    <Paper className={classes.paper}>
      <form style={{ display: "flex" }} onSubmit={handleSubmit}>
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
            <ButtonGroup size="small" className={classes.buttonGroup}>
              <Button type="submit" endIcon={<SendIcon />}>
                Ping
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item style={{ margin: 10, marginTop: 25 }}>
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
          </Grid>
        </Grid>
      </form>
      {previewSource && (
        <img
          src={previewSource}
          alt="preview of choosen file"
          style={{
            height: "250px",
            display: "block",
            margin: "0 auto",
            marginTop: 20,
          }}
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
    marginLeft: "1rem",
  },
  fileBtn: {
    border: "2px solid black",
    padding: "10px",
  },
}));
