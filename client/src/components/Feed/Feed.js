import React from "react";
import moment from "moment";
import { Grid, Paper, Avatar, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FaComments } from "react-icons/fa";
import { FiImage, FiFileText } from "react-icons/fi";
import { Link } from "react-router-dom";

import Actions from "../../utils/dashboardActions";
import NewPing from "./NewPing";
import SupportPing from "../SupportPing";
import DeleteButton from "../DeleteButton";
import { useAuthContext } from "../../utils/useAuthContext";
import { useDashboardContext } from "../../utils/useDashboardContext";

export default function Feed({ data }) {
  const classes = useStyles();
  const [_, dispatch] = useDashboardContext();
  const { user } = useAuthContext();

  function displayProfile(selectedUser) {
    if (user) {
      dispatch({ type: Actions.SELECT_USER, payload: selectedUser });
    }
  }

  return (
    <Paper className={classes.root}>
      {user && <NewPing />}
      {data.map((ping) => {
        return (
          <Paper key={ping.id} className={classes.paper}>
            <Grid container wrap="nowrap" spacing={2} alignItems="center">
              <Grid item>
                <Avatar className={classes.pic} src={ping.author.imageUrl} ></Avatar>
              </Grid>
              <Grid item>
                {ping.imageUrl ? (
                  <FiImage size={32} />
                ) : (
                  <FiFileText size={32} />
                )}
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
                    {ping.supportCount} Supported | {ping.commentCount} Comments
                  </Link>
                </Typography>
                <Typography variant="body2">{ping.body}</Typography>
              </Grid>
              <Grid item xs={2} container>
                <Grid item>
                  <SupportPing user={user} pingId={ping.id} />
                </Grid>
                <Grid item>
                  <Link to={`/ping/${ping.id}`}>
                    <IconButton>
                      <FaComments className={classes.commentIcon} size={15} />
                    </IconButton>
                  </Link>
                </Grid>
                <Grid item>
                  <DeleteButton pingId={ping.id} />
                </Grid>
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
      color: "grey",
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
  commentIcon: {
    color: "blue",
  },
}));
