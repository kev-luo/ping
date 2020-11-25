import React from "react";
import { Grid, Typography, Avatar, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import moment from "moment";

import Actions from "../../utils/dashboardActions";
import { useAuthContext } from "../../utils/useAuthContext";
import { useDashboardContext } from "../../utils/useDashboardContext";

export default function Comment({ id, createdAt, body, author }) {
  const classes = useStyles();
  const [_, dispatch] = useDashboardContext();
  const { user } = useAuthContext();

  function displayProfile(selectedUser) {
    if (user) {
      dispatch({ type: Actions.SELECT_USER, payload: selectedUser });
    }
  }

  function authorPic(author) {
    return author.imageUrl ? (
      <Avatar
        src={author.imageUrl}
        alt={author.username}
        className={classes.profilePic}
      />
    ) : (
      <Avatar className={classes.missingPic}>
        <FaUser />
      </Avatar>
    );
  }

  return (
    <div>
      <Grid container wrap="nowrap" spacing={2} alignItems="center" className={classes.root}>
        <Grid item>{authorPic(author)}</Grid>
        <Grid item xs>
          <Typography
            variant="subtitle2"
            className={classes.username}
            onClick={() => displayProfile(author)}
          >
            <Link to={`/user/supported/${author.id}`}>{author.username}</Link>
          </Typography>
          <Typography variant="subtitle2" className={classes.meta}>
            {moment(Number(createdAt)).fromNow()}
          </Typography>
          <Typography variant="body2">{body}</Typography>
        </Grid>
      </Grid>
      <Divider variant="middle" />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  username: {
    "&:hover": {
      cursor: "pointer",
    },
    "& > *": {
      textDecoration: "none",
      color: "black",
    },
  },
  missingPic: {
    width: "3rem",
    height: "3rem",
    "& > *": {
      width: "1.5rem",
      height: "1.5rem",
    },
  },
  profilePic: {
    width: "3rem",
    height: "3rem",
  },
  meta: {
    color: theme.palette.text.secondary,
    fontSize: 12,
    "& > * ": {
      textDecoration: "none",
      color: "grey",
    },
  },
}));
