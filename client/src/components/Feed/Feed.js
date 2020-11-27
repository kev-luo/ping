import React from "react";
import moment from "moment";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FaComments, FaUser } from "react-icons/fa";
import { FiImage, FiFileText } from "react-icons/fi";
import { Link } from "react-router-dom";

import Actions from "../../utils/dashboardActions";
import SupportPing from "../SupportPing";
import { useAuthContext } from "../../utils/useAuthContext";
import { useDashboardContext } from "../../utils/useDashboardContext";

export default function Feed({ data, feedType }) {
  const classes = useStyles();
  const [_, dispatch] = useDashboardContext();
  const { user } = useAuthContext();

  function displayProfile(selectedUser) {
    if (user) {
      dispatch({ type: Actions.SELECT_USER, payload: selectedUser });
    }
  }

  function containsImage(ping) {
    return ping.imageUrl ? <FiImage size={32} /> : <FiFileText size={32} />;
  }

  function authorPic(ping) {
    return ping.author.imageUrl ? (
      <Avatar
        src={ping.author.imageUrl}
        alt={ping.author.username}
        className={classes.profilePic}
      />
    ) : (
      <Avatar className={classes.missingPic}>
        <FaUser />
      </Avatar>
    );
  }

  return (
    <Paper>
      <Grid item className={classes.root}>
        <Typography variant="h5" className={classes.title}>
          {feedType} Pings
        </Typography>
        {data.map((ping) => {
          return (
            <Paper key={ping.id} className={classes.paper}>
              <Grid container wrap="nowrap" spacing={2} alignItems="center">
                <Grid item>{authorPic(ping)}</Grid>
                <Grid item>{containsImage(ping)}</Grid>
                <Grid item xs>
                  <Link
                    to={`/user/supported/${ping.author.id}`}
                    className={classes.username}
                  >
                    <Typography
                      variant="subtitle2"
                      onClick={() => displayProfile(ping.author)}
                    >
                      {ping.author.username}
                    </Typography>
                  </Link>
                  <div className={classes.metaContainer}>
                    <Typography variant="subtitle2">
                      {`${moment(Number(ping.createdAt)).fromNow()} |`}
                    </Typography>
                    <Typography variant="subtitle2">
                      {`${ping.supportCount} Supported |`}
                    </Typography>
                    <Link to={`/ping/${ping.id}`} className={classes.meta}>
                      <Typography variant="subtitle2" onClick={() => displayProfile(ping.author)}>
                        {`${ping.commentCount} Comments`}
                      </Typography>
                    </Link>
                  </div>
                  <Typography variant="body2">{ping.body}</Typography>
                </Grid>
                <Grid item xs={2} container>
                  <Grid item>
                    <SupportPing user={user} ping={ping} />
                  </Grid>
                  <Grid item>
                    <Link to={`/ping/${ping.id}`}>
                      <Tooltip title="Comment">
                        <IconButton onClick={() => displayProfile(ping.author)}>
                          <FaComments
                            className={classes.commentIcon}
                            size={15}
                          />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          );
        })}
      </Grid>
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
  title: {
    textAlign: "center",
  },
  metaContainer: {
    display: "flex",
    "& > *": {
      marginRight: "0.34rem",
      color: "#C0C0C0",
      fontSize: "12px",
      textDecoration: "none",
      "& > * ": {
        fontSize: "12px",
      },
    },
  },
  meta: {
    "&:hover": {
      color: "#708090",
      cursor: "pointer",
    },
  },
  username: {
    "&:hover": {
      cursor: "pointer",
      color: "#DC143C",
    },
    textDecoration: "none",
    color: "black",
  },
  commentIcon: {
    color: "blue",
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
}));
