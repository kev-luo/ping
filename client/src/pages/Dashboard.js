import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, AppBar, Toolbar, Typography, InputBase, fade } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    color: theme.palette.grey[400]
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: '20%'
  },
  searchIcon: {
    position: 'absolute',
    padding: theme.spacing(0,2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  input: {
    paddingLeft: '3em',
    color: 'inherit',
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
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <InputBase placeholder="Search..." className={classes.input}/>
          </div>
        </Toolbar>
      </AppBar>
    </Paper>
  )
}
