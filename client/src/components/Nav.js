import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, AppBar, Toolbar, Typography, InputBase, fade, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { BiExit } from 'react-icons/bi';

import { useAuthContext } from '../utils/useAuthContext';

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
  },
  logout: {
    marginLeft: theme.spacing(1)
  }
}))

export default function Nav() {
  const classes = useStyles();
  const context = useAuthContext();
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
          {context.user && (
            <Button
              variant="contained"
              color="default"
              endIcon={<BiExit />}
              size="small"
              className={classes.logout}
              onClick={context.logout}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Paper>
  )
}