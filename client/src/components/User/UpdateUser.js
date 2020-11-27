import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { FiImage } from 'react-icons/fi';
import { useMutation } from '@apollo/client';

import { useForm } from "../../utils/useForm";
import { UPDATE_USER } from '../../utils/graphql';

export default function UpdateUser() {
  const classes = useStyles();
  const { handleChange, handleSubmit, values, previewSource } = useForm();
  
  
  
  return (
    <div className={classes.paper}>
      <form onSubmit={handleSubmit}>
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
            style={{
              height: "250px",
              display: "block",
              margin: "0 auto",
              marginTop: 20,
            }}
          />
        )}
      </form>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {},
}));
