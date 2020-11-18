import React from 'react'
import { Paper, Button, ButtonGroup, TextField, Grid, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import SendIcon from '@material-ui/icons/Send'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

import { CREATE_PING } from '../utils/graphql';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2, 1),
    padding: theme.spacing(2, 2),
  }
}));

export default function NewPing() {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Grid container alignItems="center" >
        <form style={{display: 'flex'}}>
          <Grid item xs={10}>
            <TextField rowsMax="3" multiline fullWidth/>
          </Grid>
          <Grid item xs={2} align>
            <ButtonGroup size="small">
              <Button endIcon={<CloudUploadIcon />}>Upload</Button>
              <Button endIcon={<SendIcon />}>Ping</Button>
            </ButtonGroup>
          </Grid>
        </form>
      </Grid>
    </Paper>
  )
}
