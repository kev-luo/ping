import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { Paper, Button, ButtonGroup, TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import { CREATE_PING, FETCH_PINGS_QUERY } from "../../utils/graphql";
import { useForm } from "../../utils/useForm";

export default function NewComment() {
  const classes = useStyles();
  const initialState = { body: "" };
  const { handleChange, handleSubmit, values } = useForm(
    createPingCb,
    initialState
  );
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setFileInputState(file);
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    //converts file into a string
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", fileInputState);
    data.append("upload_preset", "pingImgs");
    data.append("cloud_name", "goodlvn");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/goodlvn/image/upload",
      data
    );

    console.log(res.data);
    return res.data.url;
  };

  const [createPing] = useMutation(CREATE_PING, {
    variables: values,
    onError(err) {
      console.log(err);
    },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_PINGS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_PINGS_QUERY,
        data: {
          getPings: [result.data.createPing, ...data.getPings],
        },
      });
      values.body = "";
    },
  });

  function createPingCb() {
    createPing();
  }

  return (
    <Paper className={classes.paper}>
      <form style={{ display: "flex" }} onSubmit={handleImageUpload}>
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
              onChange={handleFileInputChange}
              name="imageUrl"
              // value={fileInputState}
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