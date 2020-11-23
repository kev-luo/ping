import React, { useEffect } from "react";
import moment from "moment";
import { useQuery } from "@apollo/client";
import { Grid, Paper, Avatar, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FaComments } from "react-icons/fa";
import { FiImage } from "react-icons/fi";
import { Link, useRouteMatch } from "react-router-dom";

import Actions from "../../utils/dashboardActions";
import NewPing from "./NewPing";
import SupportPing from "../SupportPing";
import DeleteButton from "../DeleteButton";
import { useAuthContext } from "../../utils/useAuthContext";
import { useDashboardContext } from "../../utils/useDashboardContext";
import { FETCH_PINGS_QUERY } from "../../utils/graphql";

export default function Feed() {
  const classes = useStyles();
  const [state, dispatch] = useDashboardContext();
  const path = useRouteMatch();
  const context = useAuthContext();
  const { loading, data } = useQuery(FETCH_PINGS_QUERY);

  useEffect(() => {
    if (!loading) {
      dispatch({ type: Actions.TOGGLE_FEED, payload: data.getPings });
    }
<<<<<<< HEAD
  }, [loading]);
  // NOTE:no longer needed
=======
  }, [loading, data]);

>>>>>>> 1d96ee85f5c7db3340f2f4edab1756b285a418a6
  function displayComment(pingId) {
    if (context.user) {
      dispatch({ type: "ping", payload: pingId });
    }
  }

  function displayProfile(selectedUser) {
    if (context.user) {
      dispatch({ type: "selectUser", payload: selectedUser });
    }
  }

  return (
    <Paper className={classes.root}>
      {context.user && <NewPing />}
      {state.displayedFeed &&
        state.displayedFeed.map((ping) => {
          return (
            <Paper key={ping.id} className={classes.paper}>
              <Grid container wrap="nowrap" spacing={2} alignItems="center">
                <Grid item>
                  <Avatar className={classes.pic}>Pic</Avatar>
                </Grid>
                <Grid item>
                  <FiImage size={32} />
                </Grid>
                <Grid item xs>
                  <Typography
                    variant="subtitle2"
                    className={classes.username}
                    onClick={() => displayProfile(ping.author)}
                  >
                    {ping.author.username}
                  </Typography>
                  <Typography variant="subtitle2" className={classes.meta}>
                    <Link to={`/ping/${ping.id}`}>
                      {moment(Number(ping.createdAt)).fromNow()} |{" "}
                      {ping.supportCount} Supported | {ping.commentCount}{" "}
                      Comments
                    </Link>
                  </Typography>
                  <Typography variant="body2">{ping.body}</Typography>
                </Grid>
                <Grid item xs={2} container>
                  <Grid item>
                    <SupportPing user={context.user} ping={ping} />
                  </Grid>
                  <Grid item>
                    <IconButton
                      onClick={
                        context.user
                          ? () => dispatch({ type: "ping", payload: ping.id })
                          : () => ""
                      }
                    >
                      <FaComments style={{ color: "blue" }} size={15} />
                    </IconButton>
                  </Grid>
                  {context.user &&
                    context.user.username === ping.author.username && (
                      <Grid item>
                        <DeleteButton pingId={ping.id} />
                      </Grid>
                    )}
                </Grid>
              </Grid>
            </Paper>
          );
        })}
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fcf8f2",
    height: "80vh",
    overflow: "auto",
    padding: theme.spacing(2),
  },
  paper: {
    margin: theme.spacing(2, 1),
    padding: theme.spacing(0, 2),
    paddingRight: 0,
  },
  pic: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  meta: {
    color: theme.palette.text.secondary,
    fontSize: 12,
    "& > * ": {
      textDecoration: "none",
    },
    "&:hover": {
      cursor: "pointer",
    },
  },
  username: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));
