import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { BiExit } from "react-icons/bi";

import { useAuthContext } from "../utils/useAuthContext";
import { useDashboardContext } from "../utils/useDashboardContext";

export default function Nav() {
  const classes = useStyles();
  const context = useAuthContext();
  const [_, dispatch] = useDashboardContext();

  const logoutOps = () => {
    dispatch({ type: "clearUser" });
    context.logout();
  };

  return (
    <Paper elevation={3}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Ping
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
    color: theme.palette.grey[400],
  },
  logout: {
    marginLeft: theme.spacing(1),
  },
}));
