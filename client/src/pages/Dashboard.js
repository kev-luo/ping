import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, AppBar, Toolbar, Typography, InputBase, fade } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  }
}))

export default function Dashboard() {
  const classes = useStyles();
  return (
    <Paper elevation={3}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Ping
          </Typography>
          <div className={classes.search}>
            <SearchIcon />
            <InputBase />
          </div>
        </Toolbar>
      </AppBar>
    </Paper>
  )
}
