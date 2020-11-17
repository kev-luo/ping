import React from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Paper, Avatar, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FaRegComment, FaRegHeart } from 'react-icons/fa';
import { FiImage } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';

import { FETCH_PINGS_QUERY } from '../utils/graphql';

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
  const { loading, data } = useQuery(FETCH_PINGS_QUERY);

  return (
    <>
      { loading || (
        data.getPings && data.getPings.map(ping => {
          return(
            <Paper className={classes.paper}>
              <Grid container wrap="nowrap" spacing={2} alignItems="center">
                <Grid item >
                  <Avatar className={classes.pic}>Pic</Avatar>
                </Grid>
                <Grid item >
                  <FiImage size={32}/>
                </Grid>
                <Grid item xs >
                  <Typography>{ping.body}</Typography>
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
          )
        })
      )}
    </>
  )
}
