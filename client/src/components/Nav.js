import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { BiExit } from "react-icons/bi";
import { Link } from "react-router-dom";

import Actions from '../utils/dashboardActions'
import { useAuthContext } from "../utils/useAuthContext";
import { useDashboardContext } from "../utils/useDashboardContext";

export default function Nav() {
  const classes = useStyles();
  const context = useAuthContext();
  const [_, dispatch] = useDashboardContext();

  const logoutOps = () => {
    dispatch({ type: Actions.CLEAR_USER });
    context.logout();
  };

  return (
    <Paper elevation={3}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            <Link to="/" className={classes.link}>
              Ping
            </Link>
          </Typography>
          {context.user && (
            <Button
              variant="contained"
              color="default"
              endIcon={<BiExit />}
              size="small"
              className={classes.logout}
              onClick={logoutOps}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  logout: {
    marginLeft: theme.spacing(1),
  },
  link: {
    color: theme.palette.grey[400],
    textDecoration: "none",
  },
}));
