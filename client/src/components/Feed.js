import React from 'react'
import { Grid, Paper, Avatar, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FaRegComment, FaRegHeart, FaRegImage } from 'react-icons/fa';
import { FiImage } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(2,1),
    padding: theme.spacing(0,2),
    paddingRight: 0,
  },
  pic: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}))

export default function Feed() {
  const classes = useStyles();
  const message = "posts go here where they belongposts go here where they belongposts go here where they belongposts go here where they belongposts go here where they belongposts go here where they belongposts go here where they belongposts go here where they belongposts go here where they belongposts go here where they belongposts go here where they belongposts go here where they belong"
  return (
    <>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2} alignItems="center">
          <Grid item >
            <Avatar className={classes.pic}>Pic</Avatar>
          </Grid>
          <Grid item >
            <FiImage size={32}/>
          </Grid>
          <Grid item xs >
            <Typography>{message.substring(0,250)}</Typography>
          </Grid>
          <Grid item xs={2} container wrap="nowrap">
            <Grid item>
              <IconButton>
                <FaRegHeart />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <FaRegComment />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <AiOutlineDelete size={26}/>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

      </Paper>

      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2} alignItems="center">
          <Grid item >
            <Avatar className={classes.pic}>Pic</Avatar>
          </Grid>
          <Grid item >
            <FiImage size={32}/>
          </Grid>
          <Grid item xs >
            <Typography>{message.substring(0,200)}</Typography>
          </Grid>
          <Grid item xs={2} container wrap="nowrap">
            <Grid item>
              <IconButton>
                <FaRegHeart />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <FaRegComment />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <AiOutlineDelete size={26}/>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

      </Paper>

      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2} alignItems="center">
          <Grid item >
            <Avatar className={classes.pic}>Pic</Avatar>
          </Grid>
          <Grid item >
            <FiImage size={32}/>
          </Grid>
          <Grid item xs >
            <Typography>{message.substring(0,150)}</Typography>
          </Grid>
          <Grid item xs={2} container wrap="nowrap">
            <Grid item>
              <IconButton>
                <FaRegHeart />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <FaRegComment />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <AiOutlineDelete size={26}/>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

      </Paper>

      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2} alignItems="center">
          <Grid item >
            <Avatar className={classes.pic}>Pic</Avatar>
          </Grid>
          <Grid item >
            <FiImage size={32}/>
          </Grid>
          <Grid item xs >
            <Typography>{message.substring(0,100)}</Typography>
          </Grid>
          <Grid item xs={2} container wrap="nowrap">
            <Grid item>
              <IconButton>
                <FaRegHeart />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <FaRegComment />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <AiOutlineDelete size={26}/>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

      </Paper>
    </>
  )
}
